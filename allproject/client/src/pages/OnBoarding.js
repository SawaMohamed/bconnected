import { useEffect } from 'react'
import axios from 'axios'
import { v4 } from 'uuid'
import Nav from '../components/Nav'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import { storage } from '../utils/firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'

const OnBoarding = () => {
  //   const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState(null)
  const [imageList, setImageList] = useState([])
  const [imageUpload, setImageUpload] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    dob_day: '',
    dob_month: '',
    dob_year: '',
    show_dob: false,
    gender_identity: 'woman',
    show_gender: false,
    url: '',
    about: '',
    profession: '',
    interest: 'job',
    link_linkedin: '',
    link_portfolio: '',
    link_github: '',
    matches: [],
  })

  let navigate = useNavigate()

  const imageListRef = ref(storage, 'images/')

  // @desc    uploading image to firebase
  const uploadImage = e => {
    e.preventDefault()
    if (imageUpload === null) {
      alert('No image was selected!')
      return
    }
    // todo solve duplicate image
    // if (imageUpload === null) {
    //   alert('No image was selected!')
    //   return
    // }

    //@upload image to firebase in images folder
    const imageRef = ref(storage, `images/${imageUpload.name}_${v4()}`)
    uploadBytes(imageRef, imageUpload).then(snapshot => {
      getDownloadURL(snapshot.ref).then(url => {
        setImageList(pre => [...pre, url])
        setFormData(pre => {
          return { ...pre, url }
        })
      })

      console.log(formData)
      alert('Image Uploaded!')
    })
  }

  // @desc updating user after first creating
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      // console.log(formData)
      const response = await axios.put(
        `http://localhost:8000/users/${formData && formData.user_id}`,
        {
          formData,
        }
      )
      const success = response.status === 200
      if (success) navigate('/dashboard')
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleChange = e => {
    console.log(e)
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const name = e.target.name

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  useEffect(() => {
    return () => {
      listAll(imageListRef).then(res => {
        res.items.forEach(item => {
          getDownloadURL(item).then(url => {
            setImageList(pre => [...pre, url])
          })
        })
      })
    }
  }, [])

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />

      <div className='onboarding'>
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label>Birthday</label>
            <div className='multiple-input-container'>
              <input
                id='dob_day'
                type='number'
                name='dob_day'
                placeholder='DD'
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />

              <input
                id='dob_month'
                type='number'
                name='dob_month'
                placeholder='MM'
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />

              <input
                id='dob_year'
                type='number'
                name='dob_year'
                placeholder='YYYY'
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            <label htmlFor='show-dob'>Show Age on my Profile</label>

            <input
              id='show-dob'
              type='checkbox'
              name='show_dob'
              onChange={handleChange}
              checked={formData.show_dob}
            />

            <label>Gender</label>
            <div className='multiple-input-container'>
              <input
                id='man-gender-identity'
                type='radio'
                name='gender_identity'
                value='man'
                onChange={handleChange}
                checked={formData.gender_identity === 'man'}
              />
              <label htmlFor='man-gender-identity'>Man</label>
              <input
                id='woman-gender-identity'
                type='radio'
                name='gender_identity'
                value='woman'
                onChange={handleChange}
                checked={formData.gender_identity === 'woman'}
              />
              <label htmlFor='woman-gender-identity'>Woman</label>
              <input
                id='other-gender-identity'
                type='radio'
                name='gender_identity'
                value='other'
                onChange={handleChange}
                checked={formData.gender_identity === 'other'}
              />
              <label htmlFor='other-gender-identity'>Other</label>
            </div>

            <label htmlFor='show-gender'>Show Gender on my Profile</label>

            <input
              id='show-gender'
              type='checkbox'
              name='show_gender'
              onChange={handleChange}
              checked={formData.show_gender}
            />
            <label>Interest</label>
            <div className='multiple-input-container'>
              <input
                id='job'
                type='radio'
                name='interest'
                value='job'
                onChange={handleChange}
                checked={formData.interest === 'job'}
              />
              <label htmlFor='job'>Job</label>
              <input
                id='hiring'
                type='radio'
                name='interest'
                value='hiring'
                onChange={handleChange}
                checked={formData.interest === 'hiring'}
              />
              <label htmlFor='hiring'>Hiring</label>
              <input
                id='browsing'
                type='radio'
                name='interest'
                value='browsing'
                onChange={handleChange}
                checked={formData.interest === 'browsing'}
              />
              <label htmlFor='browsing'>Browsing</label>
            </div>

            <label htmlFor='profession'>Profession</label>
            <input
              id='profession'
              name='profession'
              required={true}
              placeholder='Enter your profession!'
              value={formData.profession}
              onChange={handleChange}
            />
            <label htmlFor='about'>About me</label>
            <input
              id='about'
              name='about'
              required={true}
              placeholder='Professional overview!'
              value={formData.about}
              onChange={handleChange}
            />
            <label htmlFor='linkedin'>Linkedin</label>
            <input
              id='linkedin'
              name='link_linkedin'
              placeholder='Linkedin!'
              value={formData.link_linkedin}
              onChange={handleChange}
            />
            <label htmlFor='portfolio'>Portfolio</label>
            <input
              id='portfolio'
              name='link_portfolio'
              placeholder='Portfolio!'
              value={formData.link_portfolio}
              onChange={handleChange}
            />
            <label htmlFor='github'>Github</label>
            <input
              id='github'
              name='link_github'
              placeholder='Github!'
              value={formData.link_github}
              onChange={handleChange}
            />

            <input type='submit' />
          </section>

          <section>
            <label htmlFor='url'>Profile Photo</label>

            <input
              type='url'
              name='url'
              id='url'
              onChange={handleChange}
              // required={true}
            />
            <input
              type='file'
              id='image-file'
              name='Choose File'
              onChange={e => setImageUpload(e.target.files[0])}
            />
            <button id='upload-btn' onClick={uploadImage}>
              Upload
            </button>
            <div className='photo-container'>
              {formData.url && (
                <img src={formData.url} alt='profile pic preview' />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  )
}
export default OnBoarding
