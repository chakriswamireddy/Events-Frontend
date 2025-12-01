import { Inbox } from '@novu/react';
import { useNavigate } from 'react-router-dom';
import React from 'react'



function NovuInbox({ tokenObj }) {

  console.log("Novu Inbox Token Obj:", tokenObj?.id);

  return (
    <>

      {tokenObj.id &&
        <Inbox
          applicationIdentifier={import.meta.env.VITE_NOVU_APP_KEY}
          subscriberId={tokenObj.id}
          // routerPush={(path) => router.push(path)}
          appearance={{
            variables: {
              colorPrimary: "#148423",
              colorForeground: "#0E121B"
            }
          }}
        />}
    </>

  );
}


export default NovuInbox