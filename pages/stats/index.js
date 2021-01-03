import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSubscription } from '@apollo/client';
import { EVENT_SUBSCRIPTION, GET_EVENTS } from '../../lib/gql';
import { client } from '../_app';

const Stats = () => {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { data } = useSubscription(EVENT_SUBSCRIPTION);
  useEffect(async () => {
    if (data != undefined) {
      setEvents(data.eventUpdated);
    } else {
      let query = await client.query({
        query: GET_EVENTS,
      });
      const currentEvents = query.data.events;
      console.log(currentEvents); // queries doesnt return updated values, they do work on graphql playground
      setEvents(currentEvents);
    }
  }, [data]);
  return (
    <div>
      <div className="container">
        <div className="col align-items-center">
          <h1>Stats</h1>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => router.push('/')}
          >
            Home
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => router.push('/logout')}
          >
            Logout
          </button>
          <br />
          {events.map((event) => (
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Lead ID:{event.leadId}</h3>
                <h4 className="card-text">Value: {event.value}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
