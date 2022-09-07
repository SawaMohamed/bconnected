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
  const [image, setImage] = useState(null)
  const [imageList, setImageList] = useState([])
  const [imageUpload, setImageUpload] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    dob: '',
    d: '',
    show_dob: true,
    gender_identity: 'woman',
    show_gender: true,
    url: '',
    about: '',
    profession: '',
    interest: 'job',
    link_linkedin: '',
    link_portfolio: '',
    link_github: '',
    matches: [],
    favUsers: [],
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
      const response = await axios.put(
        `http://localhost:8000/users/${formData?.user_id}`,
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
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const name = e.target.name

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleDob = e => {
    const value = e.target.value
    console.log(value)
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
      setUser(
        localStorage.getItem('currentUser') &&
          JSON.parse(localStorage.getItem('currentUser'))
      )
    }
  }, [])

  useEffect(() => {
    setFormData(pre => {
      return { ...pre, ...user }
    })
    console.log(formData)
    console.log(user)
  }, [user])

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />

      <div className='onboarding'>
        <h2 className='form-title'>Personal details</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor='dob'>Birthday</label>
            <input
              id='dob'
              type='Date'
              name='dob'
              value={ formData.dob}
              min='1940-01-01'
              max='2006-12-31'
              onChange={handleChange}
            />

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
            <label>Your Interest</label>
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
            <select
              className='profession-select'
              name='profession'
              value={formData?.profession}
              onChange={handleChange}
            >
              <option value=''>Your Profession</option>
              <option value='it'>IT</option>
              <option value='engineering'>Engineering</option>
              <option value='marketing_sales'>Marketing & Sales</option>
              <option value='medicine'>Medicine</option>
              <option value='architecture_design'>Architecture & Design</option>
              <option value='sport'>Sport</option>
              <option value='arts'>Arts</option>
              <option value='commerce'>Commerce</option>
              <option value='hospitality'>Hospitality</option>
              <option value='low'>Low</option>
              <option value='education'>Education</option>
              <option value='other'>Other</option>
            </select>

            <label htmlFor='about'>About me</label>
            <textarea
              className='about'
              id='about'
              type='textarea'
              name='about'
              required={true}
              placeholder='Professional overview'
              value={formData.about}
              onChange={handleChange}
              rows='4'
              cols='50'
            ></textarea>
            <label htmlFor='linkedin'>Linkedin</label>
            <input
              id='linkedin'
              name='link_linkedin'
              placeholder='Linkedin'
              value={formData.link_linkedin}
              onChange={handleChange}
            />
            <label htmlFor='portfolio'>Portfolio</label>
            <input
              id='portfolio'
              name='link_portfolio'
              placeholder='Portfolio'
              value={formData.link_portfolio}
              onChange={handleChange}
            />
            <label htmlFor='github'>Github</label>
            <input
              id='github'
              name='link_github'
              placeholder='Github'
              value={formData.link_github}
              onChange={handleChange}
            />

            <input className='submit-button' type='submit' />
          </section>

          <section>
            <label htmlFor='url'>Profile Photo</label>

            <input
              type='url'
              name='url'
              id='url'
              value={formData.url}
              placeholder='Image URL'
              onChange={handleChange}
              // required={true}
            />
            <input
              type='file'
              id='image-file'
              name='Choose File'
              onChange={e => setImageUpload(e.target.files[0])}
            />
            <button
              className='picture-upload'
              id='upload-btn'
              onClick={uploadImage}
            >
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

    // <>
    //   <Nav minimal={true} setShowModal={() => {}} showModal={false} />

    //   <div className='onboarding'>
    //     <h2 className='form-title'>Personal details</h2>

    //     <form onSubmit={handleSubmit}>
    //       <section>
    //         <label htmlFor='dob'>Birthday</label>
    //         <input
    //           id='dob'
    //           type='Date'
    //           name='dob'
    //           value={user ? user.dob : formData.dob}
    //           min='1940-01-01'
    //           max='2006-12-31'
    //           onChange={handleChange}
    //         />

    //         <label htmlFor='show-dob'>Show Age on my Profile</label>
    //         <input
    //           id='show-dob'
    //           type='checkbox'
    //           name='show_dob'
    //           onChange={handleChange}
    //           value={formData.show_dob}
    //           // value={user ? user.show_dob : formData.show_dob}
    //           checked={user?.show_dob||formData?.show_dob}
    //         />

    //         <label>Gender</label>
    //         <div className='multiple-input-container'>
    //           <input
    //             id='man-gender-identity'
    //             type='radio'
    //             name='gender_identity'
    //             value='man'
    //             onChange={handleChange}
    //             checked={user?.gender_identity === 'man'|| formData?.gender_identity === 'man'}
    //           />
    //           <label htmlFor='man-gender-identity'>Man</label>
    //           <input
    //             id='woman-gender-identity'
    //             type='radio'
    //             name='gender_identity'
    //             value='woman'
    //             onChange={handleChange}
    //             checked={user?.gender_identity === 'woman'|| formData?.gender_identity === 'woman'}
    //           />
    //           <label htmlFor='woman-gender-identity'>Woman</label>
    //           <input
    //             id='other-gender-identity'
    //             type='radio'
    //             name='gender_identity'
    //             value='other'
    //             onChange={handleChange}
    //             checked={user?.gender_identity === 'other'|| formData?.gender_identity === 'other'}
    //           />
    //           <label htmlFor='other-gender-identity'>Other</label>
    //         </div>

    //         <label htmlFor='show-gender'>Show Gender on my Profile</label>

    //         <input
    //           id='show-gender'
    //           type='checkbox'
    //           name='show_gender'
    //           value={user ? user.show_gender : formData.show_gender}
    //           onChange={handleChange}
    //           checked={user?.show_gender||formData?.show_gender}
    //         />
    //         <label>Your Interest</label>
    //         <div className='multiple-input-container'>
    //           <input
    //             id='job'
    //             type='radio'
    //             name='interest'
    //             value='job'
    //             onChange={handleChange}
    //             checked={user?.interest === 'job'||formData?.interest === 'job'}
    //           />
    //           <label htmlFor='job'>Job</label>
    //           <input
    //             id='hiring'
    //             type='radio'
    //             name='interest'
    //             value='hiring'
    //             onChange={handleChange}
    //             checked={user?.interest === 'hiring'||formData?.interest === 'hiring'}
    //           />
    //           <label htmlFor='hiring'>Hiring</label>
    //           <input
    //             id='browsing'
    //             type='radio'
    //             name='interest'
    //             value='browsing'
    //             onChange={handleChange}
    //             checked={user?.interest === 'browsing'||formData?.interest === 'browsing'}
    //           />
    //           <label htmlFor='browsing'>Browsing</label>
    //         </div>

    //         <label htmlFor='profession'>Profession</label>
    //         <select
    //           className='profession-select'
    //           name='profession'
    //           value={user ? user.profession : formData.profession}
    //           onChange={handleChange}
    //         >
    //           <option value=''>Your Profession</option>
    //           <option value='it'>IT</option>
    //           <option value='engineering'>Engineering</option>
    //           <option value='marketing_sales'>Marketing & Sales</option>
    //           <option value='medicine'>Medicine</option>
    //           <option value='architecture_design'>Architecture & Design</option>
    //           <option value='sport'>Sport</option>
    //           <option value='arts'>Arts</option>
    //           <option value='commerce'>Commerce</option>
    //           <option value='hospitality'>Hospitality</option>
    //           <option value='low'>Low</option>
    //           <option value='education'>Education</option>
    //           <option value='other'>Other</option>
    //         </select>

    //         <label htmlFor='about'>About me</label>
    //         <textarea
    //           className='about'
    //           id='about'
    //           type='textarea'
    //           name='about'
    //           required={true}
    //           placeholder='Professional overview'
    //           value={user ? user.about : formData.about}
    //           onChange={handleChange}
    //           rows='4'
    //           cols='50'
    //         ></textarea>
    //         <label htmlFor='linkedin'>Linkedin</label>
    //         <input
    //           id='linkedin'
    //           name='link_linkedin'
    //           placeholder='Linkedin'
    //           value={user ? user.link_linkedin : formData.link_linkedin}
    //           onChange={handleChange}
    //         />
    //         <label htmlFor='portfolio'>Portfolio</label>
    //         <input
    //           id='portfolio'
    //           name='link_portfolio'
    //           placeholder='Portfolio'
    //           value={user ? user.link_portfolio : formData.link_portfolio}
    //           onChange={handleChange}
    //         />
    //         <label htmlFor='github'>Github</label>
    //         <input
    //           id='github'
    //           name='link_github'
    //           placeholder='Github'
    //           value={user ? user.link_github : formData.link_github}
    //           onChange={handleChange}
    //         />

    //         <input className='submit-button' type='submit' />
    //       </section>

    //       <section>
    //         <label htmlFor='url'>Profile Photo</label>

    //         <input
    //           type='url'
    //           name='url'
    //           id='url'
    //           value={user ? user.url : formData.url}
    //           placeholder='Image URL'
    //           onChange={handleChange}
    //           // required={true}
    //         />
    //         <input
    //           type='file'
    //           id='image-file'
    //           name='Choose File'
    //           onChange={e => setImageUpload(e.target.files[0])}
    //         />
    //         <button
    //           className='picture-upload'
    //           id='upload-btn'
    //           onClick={uploadImage}
    //         >
    //           Upload
    //         </button>
    //         <div className='photo-container'>
    //           {formData.url && (
    //             <img src={formData.url} alt='profile pic preview' />
    //           )}
    //         </div>
    //       </section>
    //     </form>
    //   </div>
    // </>
  )
}
export default OnBoarding
