import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { checkAuth } from '../../store/reducers/ActionCreators'
import { useNavigatorOnLine } from '../hooks/useNavigatorOnLine'

export default function ProtectedRoutes() {
    const dispatch = useAppDispatch()
    const { status: isOnline } = useNavigatorOnLine()

    const { isAuth, isLoading } = useAppSelector(state => state.userReducer)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, [])

    if (!isOnline) {
        return (
            <span className="text-4xl font-bold absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                You are offline
            </span>
        )
    }

    if (isLoading) {
        return <span className=" absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 loading loading-bars loading-lg"></span>
    }

    if (!isAuth) {
        return <Navigate to={"../login"} />
    }

    return <Outlet />
}
