import { Fragment } from 'react'
import Head from 'next/head'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

function NewMeetupPage() { 

   async function adMeetupHandler(enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST', 
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type':'application/json'
            }
        })

        const data = await response.json()
        
        console.log(data)
    }

    return(
        <Fragment>
            <Head>
                <title>Add a new meetup</title>
                <meta
                name = 'description'
                content = 'Add your meetups'
                />
            </Head>
         <NewMeetupForm onAddMeetup ={adMeetupHandler}/> 
     </Fragment>
    )

}

export default NewMeetupPage