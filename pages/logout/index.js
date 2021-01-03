import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_EVENT } from '../../lib/gql';

const Logout = () => {
  const router = useRouter();
  const [updateEvent] = useMutation(UPDATE_EVENT);

  useEffect(async () => {
    if (!localStorage.getItem('leadId')) {
      router.push('/');
    } else {
      const leadId = localStorage.getItem('leadId');
      updateEvent({ variables: { leadId: `${leadId}`, payload: -1 } });
      localStorage.removeItem('leadId');
    }
  }, []);
  return (
    <div className="container">
      <h1>Logout</h1>
      <div>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => router.push('/')}
        >
          Home
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
  );
};

export default Logout;
