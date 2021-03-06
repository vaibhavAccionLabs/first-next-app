import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../dummy-data';

function HomePage() {
  const featutedEvents = getFeaturedEvents();

  return <div>
    <EventList items={featutedEvents} />
  </div>
}

export default HomePage;