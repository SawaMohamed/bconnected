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
    first_name: '',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    show_gender: false,
    gender_identity: 'man',
    gender_interest: 'woman',
    url: '',
    about: '',
    matches: [],
  })

  let navigate = useNavigate()

  const imageListRef = ref(storage, 'images/')
  const uploadImage = () => {
    if (imageUpload === null) {
      alert('No image was selected!')
      return
    }
    // todo make sure to don't create duplicate image
    // if (imageUpload === null) {
    //   alert('No image was selected!')
    //   return
    // }

    //@upload image to firebase in images/
    // @image will be loaded at the end of Array
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

  const handleSubmit = async e => {
    console.log('submitted')
    e.preventDefault()
    try {
      const response = await axios.put('http://localhost:8000/user', {
        formData,
      })
      console.log(response)
      const success = response.status === 200
      if (success) navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = e => {
    console.log('e', e)
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
            <label htmlFor='first_name'>First Name</label>
            <input
              id='first_name'
              type='text'
              name='first_name'
              placeholder='First Name'
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />

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
                id='more-gender-identity'
                type='radio'
                name='gender_identity'
                value='more'
                onChange={handleChange}
                checked={formData.gender_identity === 'more'}
              />
              <label htmlFor='more-gender-identity'>More</label>
            </div>

            <label htmlFor='show-gender'>Show Gender on my Profile</label>

            <input
              id='show-gender'
              type='checkbox'
              name='show_gender'
              onChange={handleChange}
              checked={formData.show_gender}
            />

            <label>Show Me</label>

            <div className='multiple-input-container'>
              <input
                id='man-gender-interest'
                type='radio'
                name='gender_interest'
                value='man'
                onChange={handleChange}
                checked={formData.gender_interest === 'man'}
              />
              <label htmlFor='man-gender-interest'>Man</label>
              <input
                id='woman-gender-interest'
                type='radio'
                name='gender_interest'
                value='woman'
                onChange={handleChange}
                checked={formData.gender_interest === 'woman'}
              />
              <label htmlFor='woman-gender-interest'>Woman</label>
              <input
                id='everyone-gender-interest'
                type='radio'
                name='gender_interest'
                value='everyone'
                onChange={handleChange}
                checked={formData.gender_interest === 'everyone'}
              />
              <label htmlFor='everyone-gender-interest'>Everyone</label>
            </div>

            <label htmlFor='about'>About me</label>
            <input
              id='about'
              type='text'
              name='about'
              required={true}
              placeholder='I like long walks...'
              value={formData.about}
              onChange={handleChange}
            />

            <input type='submit' />
          </section>

          <section>
            <label htmlFor='url'>Profile Photo</label>
            {/* <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        /> */}
            <input
              type='url'
              name='url'
              id='url'
              onChange={handleChange}
              required={true}
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
