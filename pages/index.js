import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT, UPDATE_EVENT } from '../lib/gql';
import ObjectID from 'bson-objectid';

import '../styles/Home.module.css';

const Home = () => {
  const router = useRouter();
  const [event, setEvent] = useState({});
  const [createEvent] = useMutation(CREATE_EVENT);
  const [updateEvent] = useMutation(UPDATE_EVENT);

  useEffect(async () => {
    if (!localStorage.getItem('leadId')) {
      const generatedId = ObjectID().str;
      console.log(generatedId);
      localStorage.setItem('leadId', generatedId);
      await createEvent({
        variables: { name: 'welcome', leadId: `${generatedId}` },
      });
      setEvent({ ...event, value: 1, leadId: generatedId });
    } else {
      const generatedId = localStorage.getItem('leadId');
      const { data } = await updateEvent({
        variables: { leadId: `${generatedId}`, payload: 1 },
      });
      setEvent({
        ...event,
        leadId: data.updateEvent.leadId,
        value: data.updateEvent.value,
      });
    }
  }, []);

  return (
    <div className="container">
      <div className="col align-items-center">
        <h1>Home</h1>
        <div>
          <h3>Lead ID: {event.leadId}</h3>
          <h3>Value: {event.value}</h3>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => router.push('/logout')}
          >
            Logout
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => router.push('/stats')}
          >
            Stats
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
