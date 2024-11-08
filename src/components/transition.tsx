'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Globe, Flag } from 'lucide-react'

type Language = 'en' | 'de'

const languageNames = {
  en: 'English',
  de: 'Deutsch'
}

const flagEmojis = {
  en: '🇬🇧',
  de: '🇩🇪'
}

export default function LanguageIconTransition() {
  const [language, setLanguage] = useState<Language>('en')
  const [isHovered, setIsHovered] = useState(false)

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'de' : 'en')
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-10 h-10 rounded-full"
          >
            {isHovered ? (
              <span className="text-2xl">{flagEmojis[language]}</span>
            ) : (
              <Globe className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle Language</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{languageNames[language]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}