import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    deleteDoc,
    onSnapshot,
    updateDoc
} from 'firebase/firestore'
const FormInputData = () => {
    const [form, setForm] = useState({})
    const [data, setData] = useState([])
    const [editId, setEditId] = useState(null)
    const supawitRef = collection(db, 'supawit')
    useEffect(() => {
        const unsubscribe = loadRealTime()
        return () => {
            unsubscribe()
        }
    }, [])
    const loadRealTime = () => {
        const unsubscribe = onSnapshot(supawitRef, (snapshot) => {
            const newData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setData(newData)
        })
        return () => {
            unsubscribe()
        }
    }
    const handlechange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleAddData = async () => {
        console.log('add')
        await addDoc(supawitRef, form).then((res) => {
        }).catch(err => console.log(err))
    }
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(supawitRef, id))
        } catch (err) {
            console.log(err);
        }

    }
    const handleSave = async (id) => {
        try {
            await updateDoc(doc(supawitRef, id), form)
            setEditId(null)
        } catch (err) {
            console.log(err);
        }
    }
    const handleCancel = () => {
        setEditId(null)
        setForm({})
    }

    return <div className='container'>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">เพิ่มข้อมูล</th>
                    <th scope="col"><input
                        className='form-control'
                        onChange={(e) => handlechange(e)}
                        type='text'
                        name='name'
                        placeholder='name' />
                        <br /></th>
                    <th scope="col"><input
                        className='form-control'
                        onChange={(e) => handlechange(e)}
                        type='text'
                        name='detail'
                        placeholder='detail' />
                        <br /></th>
                    <th scope="col"><input
                        className='form-control'
                        onChange={(e) => handlechange(e)}
                        type='text'
                        name='price'
                        placeholder='price' />
                        <br /></th>
                    <th scope="col"><button
                        className='btn btn-primary'
                        onClick={handleAddData}>Add data</button></th>
                </tr>
            </thead>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Detail</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>

                {data.map((item, index) =>
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                            {editId === item.id
                                ? (<><input
                                    className='form-control'
                                    onChange={(e) => handlechange(e)}
                                    type='text'
                                    name='name'
                                    value={form.name !== undefined ? form.name : item.name}
                                    placeholder='name' /></>)
                                : (item.name)
                            }
                        </td>
                        <td>
                            {editId === item.id
                                ? (<><input
                                    className='form-control'
                                    onChange={(e) => handlechange(e)}
                                    type='text'
                                    name='detail'
                                    value={form.detail !== undefined ? form.detail : item.detail}
                                    placeholder='detail' /></>)
                                : (item.detail)
                            }
                        </td>
                        <td>
                            {editId === item.id
                                ? (<><input
                                    className='form-control'
                                    onChange={(e) => handlechange(e)}
                                    type='number'
                                    name='price'
                                    value={form.price !== undefined ? form.price : item.price}
                                    placeholder='price' /></>)
                                : (item.price)
                            }
                        </td>
                        {editId === item.id
                            ? (<>
                                <td><button
                                    className='btn btn-success'
                                    onClick={() => handleSave(item.id)}>Save</button></td>
                                <td><button
                                    className='btn btn-secondary'
                                    onClick={() => handleCancel(item.id)}>Cancel</button></td>
                            </>)
                            : (
                                <>
                                    <td><button
                                        className='btn btn-warning'
                                        onClick={() => setEditId(item.id)}>Edit</button></td>
                                    <td><button
                                        className='btn btn-danger'
                                        onClick={() => handleDelete(item.id)}>Delete</button></td>
                                </>
                            )
                        }
                    </tr>
                )}



            </tbody>
        </table>
    </div>
}

export default FormInputData