import React, { useState, useEffect } from 'react'
import ReactTagInput from '@pathofdev/react-tag-input'
import '@pathofdev/react-tag-input/build/index.css'
import { db, storage } from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
}

const categoryOption = [
  "Javascript",
  "HTML & CSS",
  "React",
  "Vuejs",
  "Python",
  "Java"
]

const AddEditBlog = ({user, setActive}) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const {title, tags, trending, category, description} = form;
  const [progress, setProgress] = useState(null);

  const {id} = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Téléchargement en pause");
            break;
          case "running":
            console.log("Le téléchargement est en cours");
            break;
          default:
            break;
        }
      }, (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          toast.info("Téléchargement d'image vers firebase avec succès");
          setForm((prev) => ({...prev, imgUrl: downloadUrl}));
        });
      }
      );
    };
    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({...snapshot.data()});
    }
    setActive(null);
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const handleTags = (tags) => {
    setForm({...form, tags});
  }

  const handleTrending = (e) => {
    setForm({...form, trending: e.target.value});
  }

  const onCategoryChange = (e) => {
    setForm({...form, category: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid
          });
          toast.success("Le blog a été créé avec succès");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid
          });
          toast.success("Le blog a été mis à jour avec succès");
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      return toast.error("Tous les champs sont obligatoires");
    }

    navigate("/");
  }

  return (
    <div className='container-fluid mb-4'>
      <div className="container">
        <div className="col-12">
          <div className="text-center heading-py-2">
            {id ? "Mettre à jour le blog" : "Création d'un blog"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row blog-form" onSubmit={handleSubmit}>
              <div className="col-12 py-3">
                <input type="text" className='form-control input-text-box' placeholder='Title' name='title' value={title} onChange={handleChange} />
              </div>
              <div className="col-12 py-3">
                <ReactTagInput tags={tags} placeholder="Tags" onChange={handleTags}></ReactTagInput>
              </div>
              <div className="col-12 py-3">
                <p className="trending">Est-ce un blog tendance ?</p>
                <div className="form-check-inline mx-2">
                  <input type="radio" className='form-check-input' name='radioOption' value="yes" onChange={handleTrending} checked={trending === "yes"} />
                  <label htmlFor="radioOption" className='form-check-label'>Yes&nbsp;</label>
                  <input type="radio" className='form-check-input' name='radioOption' value="no" onChange={handleTrending} checked={trending === "no"} />
                  <label htmlFor="radioOption" className='form-check-label'>No&nbsp;</label>
                </div>
              </div>
              <div className="col-12 py-3">
                <select value={category} onChange={onCategoryChange} className="catg-dropdown">
                  <option>Veuillez choisir une catégorie</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="col-12 py-3">
                <textarea className='form-control description-box' placeholder='Description' value={description} name="description" onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])}/>
              </div>
              <div className="col-12 py-3 text-center">
                  <button className="btn btn-add" type='submit' disabled={progress !== null && progress < 100}>
                    {id ? "Mettre à jour" : "Envoyer"}
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEditBlog
