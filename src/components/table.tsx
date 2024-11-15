'use client';

import { useEffect, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Loader2,
  ArrowUpDown,
  Calendar,
  Plus,
  Trash2,
  Pencil,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast, Toaster } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Event = {
  id: number;
  attributes: {
    Title: string;
    Description: string;
    Startdate: string;
    Enddate: string;
    Room: string;
    Speaker: string;
    ColorCode: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    ShowSinglePage: boolean;
    Status: 'Announced' | 'In Progress' | 'Done';
  };
};

type SortConfig = {
  key:
    | keyof Event
    | keyof Event['attributes']
    | 'startTime'
    | 'endTime'
    | 'status';
  direction: 'ascending' | 'descending';
};

type DateRange = {
  from: Date;
  to: Date | undefined;
};

const ALL_ROOMS = 'all_rooms';
const ALL_SPEAKERS = 'all_speakers';

const DateRangePicker = ({
  dateRange,
  setDateRange,
}: {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[300px] justify-start text-left font-normal"
        >
          <Calendar className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, 'LLL dd, y')} -{' '}
                {format(dateRange.to, 'LLL dd, y')}
              </>
            ) : (
              format(dateRange.from, 'LLL dd, y')
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarComponent
          initialFocus
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={(range) => setDateRange(range as DateRange | undefined)}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};

const AddEventDialog = ({
  onEventAdded,
}: {
  onEventAdded: (event: Event) => void;
}) => {
  const [newEvent, setNewEvent] = useState<Partial<Event['attributes']>>({
    Title: '',
    Description: '',
    Startdate: '',
    Enddate: '',
    Room: '',
    Speaker: '',
    Status: 'Announced',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const event: Event = {
      id: Date.now(),
      attributes: {
        ...newEvent,
        ColorCode: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        locale: 'en',
        ShowSinglePage: false,
      } as Event['attributes'],
    };
    onEventAdded(event);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newEvent.Title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, Title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={newEvent.Description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, Description: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="datetime-local"
              value={newEvent.Startdate}
              onChange={(e) =>
                setNewEvent({ ...newEvent, Startdate: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="datetime-local"
              value={newEvent.Enddate}
              onChange={(e) =>
                setNewEvent({ ...newEvent, Enddate: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="room">Room</Label>
            <Input
              id="room"
              value={newEvent.Room}
              onChange={(e) =>
                setNewEvent({ ...newEvent, Room: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="speaker">Speaker</Label>
            <Input
              id="speaker"
              value={newEvent.Speaker}
              onChange={(e) =>
                setNewEvent({ ...newEvent, Speaker: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={newEvent.Status}
              onValueChange={(value) =>
                setNewEvent({
                  ...newEvent,
                  Status: value as 'Announced' | 'In Progress' | 'Done',
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Add Event</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const EditEventDialog = ({
  event,
  onEventUpdated,
}: {
  event: Event;
  onEventUpdated: (
    eventId: number,
    updatedData: Partial<Event['attributes']>
  ) => void;
}) => {
  const [editedEvent, setEditedEvent] = useState<Partial<Event['attributes']>>({
    Title: event.attributes.Title,
    Description: event.attributes.Description,
    Startdate: event.attributes.Startdate,
    Enddate: event.attributes.Enddate,
    Room: event.attributes.Room,
    Speaker: event.attributes.Speaker,
    Status: event.attributes.Status,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEventUpdated(event.id, editedEvent);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit event</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={editedEvent.Title}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent, Title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Input
              id="edit-description"
              value={editedEvent.Description}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent, Description: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="edit-startDate">Start Date</Label>
            <Input
              id="edit-startDate"
              type="datetime-local"
              value={editedEvent.Startdate}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent, Startdate: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-endDate">End Date</Label>
            <Input
              id="edit-endDate"
              type="datetime-local"
              value={editedEvent.Enddate}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent, Enddate: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-room">Room</Label>
            <Input
              id="edit-room"
              value={editedEvent.Room}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent, Room: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-speaker">Speaker</Label>
            <Input
              id="edit-speaker"
              value={editedEvent.Speaker}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent, Speaker: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-status">Status</Label>
            <Select
              value={editedEvent.Status}
              onValueChange={(value) =>
                setEditedEvent({
                  ...editedEvent,
                  Status: value as 'Announced' | 'In Progress' | 'Done',
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default function CaresignEventsTable() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roomFilter, setRoomFilter] = useState<string>(ALL_ROOMS);
  const [speakerFilter, setSpeakerFilter] = useState<string>(ALL_SPEAKERS);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'id',
    direction: 'ascending',
  });
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://api.caresign.app/api/cs-events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getStatusBadgeVariant = (
    status: string
  ): 'default' | 'outline' | 'destructive' | 'secondary' | undefined => {
    switch (status) {
      case 'Done':
        return 'destructive';
      case 'In Progress':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      (roomFilter === ALL_ROOMS || event.attributes.Room === roomFilter) &&
      (speakerFilter === ALL_SPEAKERS ||
        event.attributes.Speaker === speakerFilter) &&
      (!dateRange ||
        (new Date(event.attributes.Startdate) >= dateRange.from &&
          (!dateRange.to ||
            new Date(event.attributes.Enddate) <= dateRange.to)))
  );

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortConfig.key === 'id') {
      return sortConfig.direction === 'ascending' ? a.id - b.id : b.id - a.id;
    } else if (sortConfig.key === 'startTime' || sortConfig.key === 'endTime') {
      const dateKey = sortConfig.key === 'startTime' ? 'Startdate' : 'Enddate';
      const aTime = new Date(a.attributes[dateKey]).getTime();
      const bTime = new Date(b.attributes[dateKey]).getTime();
      return sortConfig.direction === 'ascending'
        ? aTime - bTime
        : bTime - aTime;
    } else if (sortConfig.key === 'status') {
      const aStatus = a.attributes.Status;
      const bStatus = b.attributes.Status;
      if (aStatus < bStatus)
        return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aStatus > bStatus)
        return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    } else {
      const aValue = a.attributes[sortConfig.key as keyof Event['attributes']];
      const bValue = b.attributes[sortConfig.key as keyof Event['attributes']];
      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    }
  });

  const rooms = Array.from(
    new Set(events.map((event) => event.attributes.Room))
  );
  const speakers = Array.from(
    new Set(events.map((event) => event.attributes.Speaker))
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSort = (key: SortConfig['key']) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === 'ascending'
          ? 'descending'
          : 'ascending',
    }));
  };

  const handleStatusChange = async (
    eventId: number,
    newStatus: 'In Progress' | 'Done'
  ) => {
    try {
      const response = await fetch(
        `https://api.caresign.app/api/cs-events/${eventId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              Status: newStatus,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update event status');
      }

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId
            ? {
                ...event,
                attributes: { ...event.attributes, Status: newStatus },
              }
            : event
        )
      );
      toast.success('Event status updated successfully');
    } catch (error) {
      toast.error('Error updating event status');
    }
  };

  const handleAddEvent = async (newEvent: Event) => {
    try {
      const response = await fetch('https://api.caresign.app/api/cs-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            Title: newEvent.attributes.Title,
            Description: newEvent.attributes.Description,
            Startdate: newEvent.attributes.Startdate,
            Enddate: newEvent.attributes.Enddate,
            Room: newEvent.attributes.Room,
            Speaker: newEvent.attributes.Speaker,
            ColorCode: newEvent.attributes.ColorCode,
            ShowSinglePage: newEvent.attributes.ShowSinglePage,
            Status: newEvent.attributes.Status,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      const createdEvent = await response.json();
      setEvents((prevEvents) => [...prevEvents, createdEvent.data]);
      toast.success('Event added successfully');
    } catch (error) {
      toast.error('Error adding event');
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    try {
      const response = await fetch(
        `https://api.caresign.app/api/cs-events/${eventId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
      toast.success('Event deleted successfully');
    } catch (error) {
      toast.error('Error deleting event');
    }
  };

  const handleUpdateEvent = async (
    eventId: number,
    updatedData: Partial<Event['attributes']>
  ) => {
    try {
      const response = await fetch(
        `https://api.caresign.app/api/cs-events/${eventId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: updatedData,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      const updatedEvent = await response.json();
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId ? updatedEvent.data : event
        )
      );
      toast.success('Event updated successfully');
    } catch (error) {
      toast.error('Error updating event');
    }
  };

  const SortableTableHead = ({
    children,
    sortKey,
    className,
  }: {
    children: React.ReactNode;
    sortKey: SortConfig['key'];
    className?: string;
  }) => (
    <TableHead className={className}>
      <Button
        variant="ghost"
        onClick={() => handleSort(sortKey)}
        className="h-8 text-left font-medium p-0"
      >
        {children}
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </Button>
    </TableHead>
  );

  if (loading) {
    return (
      <Card className="w-full max-w-3xl mx-auto  mt-8">
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="w-full px-5 py-2 sm:px-6 lg:px-20">
      <Toaster />
      <Card className="w-full overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Caresign Events</CardTitle>
              <CardDescription>Manage and view Caresign events</CardDescription>
            </div>
            <AddEventDialog onEventAdded={handleAddEvent} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Select
              value={roomFilter}
              onValueChange={(value) => setRoomFilter(value)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Room" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_ROOMS}>All Rooms</SelectItem>
                {rooms.map((room) => (
                  <SelectItem key={room} value={room}>
                    {room}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={speakerFilter}
              onValueChange={(value) => setSpeakerFilter(value)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Speaker" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_SPEAKERS}>All Speakers</SelectItem>
                {speakers.map((speaker) => (
                  <SelectItem key={speaker} value={speaker}>
                    {speaker}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DateRangePicker
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </div>
          <div className="overflow-x-auto">
            <Table className="max-w-[800px] mx-auto">
              <TableHeader>
                <TableRow>
                  <SortableTableHead sortKey="id" className="w-[50px]">
                    ID
                  </SortableTableHead>
                  <SortableTableHead sortKey="Title" className="max-w-[150px]">
                    Title
                  </SortableTableHead>
                  <SortableTableHead
                    sortKey="Speaker"
                    className="max-w-[120px]"
                  >
                    Speaker
                  </SortableTableHead>
                  <SortableTableHead sortKey="Room" className="w-[80px]">
                    Room
                  </SortableTableHead>
                  <SortableTableHead sortKey="Startdate" className="w-[100px]">
                    Start Date
                  </SortableTableHead>
                  <SortableTableHead sortKey="startTime" className="w-[80px]">
                    Start Time
                  </SortableTableHead>
                  <SortableTableHead sortKey="Enddate" className="w-[100px]">
                    End Date
                  </SortableTableHead>
                  <SortableTableHead sortKey="endTime" className="w-[80px]">
                    End Time
                  </SortableTableHead>
                  <SortableTableHead
                    sortKey="ShowSinglePage"
                    className="w-[80px]"
                  >
                    Page
                  </SortableTableHead>
                  <SortableTableHead sortKey="status" className="w-[120px]">
                    Status
                  </SortableTableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.id}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {event.attributes.Title}
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {event.attributes.Speaker}
                    </TableCell>
                    <TableCell>{event.attributes.Room}</TableCell>
                    <TableCell>
                      {formatDate(event.attributes.Startdate)}
                    </TableCell>
                    <TableCell>
                      {formatTime(event.attributes.Startdate)}
                    </TableCell>
                    <TableCell>
                      {formatDate(event.attributes.Enddate)}
                    </TableCell>
                    <TableCell>
                      {formatTime(event.attributes.Enddate)}
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={event.attributes.ShowSinglePage}
                        onCheckedChange={() => {}}
                        aria-label="Page"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={event.attributes.Status}
                        onValueChange={(value) =>
                          handleStatusChange(
                            event.id,
                            value as 'In Progress' | 'Done'
                          )
                        }
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue>
                            <Badge
                              variant={getStatusBadgeVariant(
                                event.attributes.Status
                              )}
                              className={`
                                ${
                                  event.attributes.Status === 'Done'
                                    ? 'bg-green-100 text-green-800'
                                    : ''
                                }
                                ${
                                  event.attributes.Status === 'In Progress'
                                    ? 'bg-orange-100 text-orange-800'
                                    : ''
                                }
                              `}
                            >
                              {event.attributes.Status}
                            </Badge>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="In Progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="Done">Done</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <EditEventDialog
                          event={event}
                          onEventUpdated={handleUpdateEvent}
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            handleDeleteEvent(event.id);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
