'use client'

import React, { useEffect, useState } from 'react'
import { Monitor, Smartphone } from 'lucide-react'

export const MobileWarning: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
      const isSmallScreen = window.innerWidth < 768
      
      setIsMobile(isMobileDevice || isSmallScreen)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!isMobile) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Monitor className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            <Smartphone className="w-8 h-8 text-gray-400 absolute -bottom-1 -right-1" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Desktop Experience Recommended
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          MarkCraft is optimized for desktop and tablet devices to provide the best editing experience. 
          For optimal performance and full feature access, please view this application on a larger screen.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Why desktop?</strong> Better split-screen editing, full toolbar access, 
            and enhanced productivity features.
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <span>MarkCraft</span>
          <span>•</span>
          <span>An Innovative MarkDown Editor</span>
        </div>
      </div>
    </div>
  )
}
