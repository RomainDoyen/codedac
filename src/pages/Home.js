import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React, {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import BlogSection from '../components/BlogSection';
import MostPopular from '../components/MostPopular';
import Spinner from '../components/Spinner';
import Tags from '../components/Tags';
import Trending from '../components/Trending';
import { db } from '../firebase';

const Home = ({setActive, user}) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [trendBlogs, setTrendBlogs] = useState([]);

  const getTrendingBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const trendQuery = query(blogRef, where("trending", "==", "yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTrendBlogs(trendBlogs);
  };

  useEffect(() => {
    getTrendingBlogs();
    const unsub = onSnapshot(collection(db, "blogs"), (snapshot) => {
      let list = [];
      let tags = [];
      snapshot.docs.forEach((doc) => {
        tags.push(...doc.get("tags"));
        list.push({id: doc.id, ...doc.data()});
      });
      const uniqueTags = [...new Set(tags)];
      setTags(uniqueTags);
      setBlogs(list);
      setLoading(false);
      setActive("home");
    }, (error) => {
      console.log(error);
    });
    return () => {
      unsub();
      getTrendingBlogs();
    }
  }, [setActive]);

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

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div class="flex-content">
      <div class="content">
        <p><i class="fa-solid fa-l"></i>orem ipsum dolor sit amet, consectetur adipisicing elit. 
          Reprehenderit ratione, praesentium distinctio iure animi eius nemo? Blanditiis, debitis. 
          Et eaque nostrum rem odio, explicabo aspernatur! Modi culpa iure magni nobis.
        </p>
      </div>
    </div>
    <div class="main">
      <div class="glass-1">
        <h2><i class="fa-solid fa-chevron-right"></i> Bonjour !</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          doloremque et soluta sed impedit maxime, veniam molestias. Dolorem
          qui, quibusdam, debitis magnam, quos itaque voluptas aliquam nulla
          placeat totam officiis. 📟
        </p>
        <span><i class="fa-solid fa-code"></i></span>
      </div>
      <div class="glass-2">
        <h2><i class="fa-solid fa-chevron-right"></i> Hello World !</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          doloremque et soluta sed <span class="green">impedit</span> maxime,
          veniam molestias. Dolorem qui, quibusdam, debitis magnam, quos itaque
          voluptas aliquam nulla placeat totam officiis. <span class="lien">🔗</span>
        </p>
        <span><i class="fa-solid fa-code"></i></span>
      </div>
    </div>
      <div className="container padding">
        <div className="row mx-0">
          <Trending blogs={trendBlogs}></Trending>
          <div className="col-md-8">
            <BlogSection blogs={blogs} user={user} handleDelete={handleDelete} />
          </div>
          <div className="col-md-3">
            <Tags tags={tags}></Tags>
            <MostPopular blogs={blogs}></MostPopular>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
