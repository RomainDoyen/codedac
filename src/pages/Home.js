import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import BlogSection from '../components/BlogSection';
import Spinner from '../components/Spinner';
import { db } from '../firebase';

const Home = ({setActive, user}) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "blogs"), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({id: doc.id, ...doc.data()});
      });
      setBlogs(list);
      setLoading(false);
      setActive("home");
    }, (error) => {
      console.log(error);
    });
    return () => {
      unsub();
    }
  }, []);

  if (loading) {
    return <Spinner></Spinner>
  }

  const handleDelete = async (id) => {
    if (window.confirm("Vous êtes sûr de vouloir supprimer ce blog ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Le blog a été supprimé avec succès");
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  }

  console.log("blogs", blogs);

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="row mx-0">
          <h2>Tendances</h2>
          <div className="col-md-8">
            <BlogSection blogs={blogs} user={user} handleDelete={handleDelete} />
          </div>
          <div className="col-md-3">
            <h2>Tags</h2>
            <h2>Le plus populaire</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
