import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import './UploadImage.css'
import { Button, Group } from '@mantine/core';

const UploadImage = ({ propertyDetails, setPropertyDetails, nextStep, prevStep }) => {

    const [imageURL, setImageURL] = useState(propertyDetails.image);

    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    const handleNext=()=>{
        setPropertyDetails((prev)=> ({...prev, image: imageURL}))
        nextStep();
    }


    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dm7dnjhr8",
            uploadPreset: "myjwv735",
            maxFiles: 1

        }, // below given callback function gets executed when a upload is successfull and it triggers a success event
            (err, result) => {
                if (result.event === "success") {
                    setImageURL(result.info.secure_url)
                }
            }

        )
    }, [])
    //info.secure_url will have the url for the uploaded image
    return (
        <div className="flexColCenter uploadWrapper ">
            {
                !imageURL ? (
                    <div className="flexColCenter uploadZone"
                        onClick={() => widgetRef.current?.open()}
                    >
                        <AiOutlineCloudUpload size={50} color="grey" />
                        <span>Upload Image</span>
                    </div>
                ) : (
                    <div className="uploadedImage"
                        onClick={() => widgetRef.current?.open()}
                    >
                        <img src={imageURL} alt="property image" />
                    </div>
                )
            }

            <Group position='center' mt={"xl"} >
                <Button variant='default' onClick={prevStep} >
                    Back
                </Button>
                <Button onClick={handleNext} disabled={!imageURL} >
                    Next
                </Button>
            </Group>
        </div>
    )
}

export default UploadImage
