export const translations = {
    en: {
      title: "Caresign Events",
      description: "Manage and view Caresign events",
      addEvent: "Add Event",
      room: "Room",
      allRooms: "All Rooms",
      speaker: "Speaker",
      allSpeakers: "All Speakers",
      pickDateRange: "Pick a date range",
      columns: {
        id: "ID",
        title: "Title",
        speaker: "Speaker",
        room: "Room",
        startDate: "Start Date",
        startTime: "Start Time",
        endDate: "End Date",
        endTime: "End Time",
        page: "Page",
        status: "Status",
        actions: "Actions"
      },
      status: {
        inProgress: "In Progress",
        done: "Done",
        next: "Next"
      },
      actions: {
        viewDetails: "View details",
        editEvent: "Edit event",
        delete: "Delete"
      },
      messages: {
        addSuccess: "Event added successfully",
        addError: "Error adding event",
        deleteSuccess: "Event deleted successfully",
        deleteError: "Error deleting event",
        updateSuccess: "Event status updated successfully",
        updateError: "Error updating event status"
      }
    },
    de: {
      title: "Caresign Veranstaltungen",
      description: "Verwalten und ansehen von Caresign-Veranstaltungen",
      addEvent: "Veranstaltung hinzufügen",
      room: "Raum",
      allRooms: "Alle Räume",
      speaker: "Sprecher",
      allSpeakers: "Alle Sprecher",
      pickDateRange: "Datumsbereich auswählen",
      columns: {
        id: "ID",
        title: "Titel",
        speaker: "Sprecher",
        room: "Raum",
        startDate: "Startdatum",
        startTime: "Startzeit",
        endDate: "Enddatum",
        endTime: "Endzeit",
        page: "Seite",
        status: "Status",
        actions: "Aktionen"
      },
      status: {
        inProgress: "In Bearbeitung",
        done: "Erledigt",
        next: "Nächste"
      },
      actions: {
        viewDetails: "Details anzeigen",
        editEvent: "Veranstaltung bearbeiten",
        delete: "Löschen"
      },
      messages: {
        addSuccess: "Veranstaltung erfolgreich hinzugefügt",
        addError: "Fehler beim Hinzufügen der Veranstaltung",
        deleteSuccess: "Veranstaltung erfolgreich gelöscht",
        deleteError: "Fehler beim Löschen der Veranstaltung",
        updateSuccess: "Veranstaltungsstatus erfolgreich aktualisiert",
        updateError: "Fehler beim Aktualisieren des Veranstaltungsstatus"
      }
    }
  };
  
  export type Language = keyof typeof translations;