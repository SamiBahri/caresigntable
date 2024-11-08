"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"



// Define the Event type
interface Event {
  id: number;
  attributes: {
    Title: string;
    Speaker: string;
    Room: string;
    Startdate: string;
    Enddate: string;
    ShowSinglePage: boolean;
    Description: string;
    ColorCode: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
  };
}



// export function AddEventDialog ({ onEventAdded }: { onEventAdded: (event: Event) => void }) {
export function AddEventDialog({ onEventAdded }: { onEventAdded: (event: Event) => Promise<void> }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    
    title: "",
    speaker: "",
    room: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    showSinglePage: false
    
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    console.log("Form submitted:", formData)

    const newEvent: Event = {
      id: Math.floor(Math.random() * 1000000), // Generates a random integer between 0 and 999999
      attributes: {
        Title: formData.title,
        Speaker: formData.speaker,
        Room: formData.room,
        Startdate: `${formData.startDate}T${formData.startTime}:00`,
        Enddate: `${formData.endDate}T${formData.endTime}:00`,
        ShowSinglePage: formData.showSinglePage,
        // Add other necessary fields with default values
        Description: "",
        ColorCode: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        locale: "en"
      }
    };
    
    // Call the onEventAdded function with the new event
    onEventAdded(newEvent);
    setOpen(false)
  }
  
  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Fill in the details for the new event. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="speaker" className="text-right">
                Speaker
              </Label>
              <Input
                id="speaker"
                value={formData.speaker}
                onChange={(e) => handleChange("speaker", e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="room" className="text-right">
                Room
              </Label>
              <Input
                id="room"
                value={formData.room}
                onChange={(e) => handleChange("room", e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startTime" className="text-right">
                Start Time
              </Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleChange("startTime", e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endTime" className="text-right">
                End Time
              </Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleChange("endTime", e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="showSinglePage" className="text-right">
                Show Page
              </Label>
              <div className="col-span-3">
                <Checkbox
                  id="showSinglePage"
                  checked={formData.showSinglePage}
                  onCheckedChange={(checked) => handleChange("showSinglePage", checked)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}