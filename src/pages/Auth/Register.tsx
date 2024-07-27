import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from 'react-hook-form'
import { musicLoversAPI } from '../../store/api/musicLoversAPI';
import { Link, redirect, useNavigate } from "react-router-dom";
import { login, signUp } from '../../store/reducers/ActionCreators';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';


const schema = z.object({
    email: z.string().email(),
    name: z.string().max(32).min(1),
    password: z.string().min(3).max(32)
})

type FormFields = z.infer<typeof schema>

export default function Login() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({ resolver: zodResolver(schema) })
    const { error, isAuth, isLoading } = useAppSelector(state => state.userReducer)

    function onSubmit(data: FormFields) {
        dispatch(signUp(data))
    }

    if (isAuth) {
        navigate("/")
    }

    return (
        <div className='flex items-center justify-center h-screen w-full'>
            <div className='max-w-[400px] w-full'>
                <h1 className=' text-center text-5xl font-bold mb-4'>Sing Up</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-4'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input {...register("email")} type="text" placeholder="Type here" className="input input-bordered w-full" />
                            {errors.email && <div className='mt-2 text-error'>{errors.email.message}</div>}
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input {...register("name")} type="text" placeholder="Type here" className="input input-bordered w-full" />
                            {errors.name && <div className='mt-2 text-error'>{errors.name.message}</div>}
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input {...register("password")} type="text" placeholder="Type here" className="input input-bordered w-full" />
                            {errors.password && <div className='mt-2 text-error'>{errors.password.message}</div>}

                        </label>
                        <button className={"btn btn-primary btn-md" + (isLoading ? " btn-disabled" : '')}>Sing Up
                        </button>

                        {<div className='mt-2 text-error'>{error ? error.message : ''}</div>}
                        <div>New to Music Lovers? <Link className='ml-4 text-info' to={"/login"}>Login</Link> </div>


                    </div>
                </form>
            </div>
        </div>

    )
}