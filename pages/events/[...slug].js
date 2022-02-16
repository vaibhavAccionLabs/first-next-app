import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { getFilteredEvents } from '../../dummy-data';
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/results-title/results-title";
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage() {
    const router = useRouter();
    const { slug } = router.query;

    if (!slug) {
        return <p className='center'>Loading...</p>
    }

    const filteredYear = +slug[0];
    const filteredMonth = +slug[1];

    if (isNaN(filteredYear) || isNaN(filteredMonth) || filteredMonth < 1 || filteredMonth > 12 || filteredYear > 2030) {

        return <Fragment>
            <ErrorAlert>
                <p>Invalid Filter. Please adjust the Values.</p>
            </ErrorAlert>
            <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
        </Fragment>
    }

    const events = getFilteredEvents({
        year: filteredYear,
        month: filteredMonth
    });

    if (!events || !events?.length) {
        return <Fragment>
            <ErrorAlert>
                <p>No Events found!</p>
            </ErrorAlert>
            <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
        </Fragment>
    }

    const date = new Date(filteredYear, filteredMonth - 1);
    return (<Fragment>
        <ResultsTitle date={date} />
        <EventList items={events} />
    </Fragment>);
}

export default FilteredEventsPage;