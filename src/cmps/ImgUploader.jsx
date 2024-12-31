/* eslint-disable react/prop-types */
import { useState } from 'react'
import { uploadService } from '../service/upload.service'

export function ImgUploader({ onUploaded = null }) {
    
    const [imgData, setImgData] = useState({
        imgUrl: null,
        height: 500,
        width: 500,
    })

    const [isUploading, setIsUploading] = useState(false)

    async function uploadImg(ev) {
        setIsUploading(true)
        const { secure_url, height, width } = await uploadService.uploadImg(ev)
        setImgData({ imgUrl: secure_url, width, height })
        setIsUploading(false)
        onUploaded?.(secure_url)
    }

    function getUploadLabel() {
        if (imgData.imgUrl) return 'Upload Another?'
        return isUploading ? 'Uploading....' : 'Upload Image'
    }

    return (
        <div className="upload-preview" style={{display:"grid"}}>
            {imgData.imgUrl && <img src={imgData.imgUrl} style={{ maxWidth: '100px', float: 'right' }} />}
            <label htmlFor="imgUpload">{getUploadLabel()}</label>
            <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
        </div>
    )
}