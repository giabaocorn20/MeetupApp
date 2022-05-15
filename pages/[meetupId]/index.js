import { MongoClient, ObjectId } from "mongodb"
import Head from "next/head";
import { Fragment } from "react/cjs/react.production.min";

import MeetupDetail from "../../components/meetups/MeetupDetail"

function MeetupDetails(props) { 
    return ( 
        <Fragment>
            <Head>
                <title>Meetup detail</title>
                <meta
                name = 'description'
                content="detail"/>
            </Head>
            <MeetupDetail 
                    src= {props.meetupData.image}
                    title= {props.meetupData.title}
                    address= {props.meetupData.address} 
                    description={props.meetupData.description}
                />
        </Fragment>
    )
}
export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb+srv://giabaocorn20:12062003aA@cluster0.wtrw3.mongodb.net/meetups?retryWrites=true&w=majority');
        
    const db = client.db();
    
    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray()

    client.close()
    
    return {
            fallback: 'blocking',
            paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}}))    
        }
}

export async function getStaticProps(context) {
    // fetch data for a single meetup
  
    const meetupId = context.params.meetupId;
  
    const client = await MongoClient.connect(
      'mongodb+srv://giabaocorn20:12062003aA@cluster0.wtrw3.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();
  
    const meetupsCollection = db.collection('meetups');
  
    const selectedMeetup = await meetupsCollection.findOne({
      _id: ObjectId(meetupId), //convert id to ObjectId
    });
  
    client.close();
  
    return {
      props: {
        meetupData: {
            id: selectedMeetup._id.toString(), //convert back to string
            title: selectedMeetup.title,
            address: selectedMeetup.address,
            image: selectedMeetup.image,
            description: selectedMeetup.description,
        }
      },
    };
  }

export default MeetupDetails