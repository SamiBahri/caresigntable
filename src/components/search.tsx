'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function ResearchInput() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the search action
    console.log('Searching for:', searchQuery)
    // You could add API calls or state updates here
  }

  return (
    <div className="max-w-md mx-auto ">
     
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter your research query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" className="flex-shrink-0">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </form>
    </div>
  )
}