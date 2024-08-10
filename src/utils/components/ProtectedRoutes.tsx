import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux'
import { Outlet, Navigate } from 'react-router-dom'
import { checkAuth } from '../../store/reducers/ActionCreators'
import { useNavigatorOnLine } from '../hooks/useNavigatorOnLine'
import LoadingsBars from './ui/LoadingsBars'
import OfflineMessage from './ui/OfflineMessage'

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
            <OfflineMessage />
        )
    }

    if (isLoading) {
        return <LoadingsBars />
    }

    if (!isAuth) {
        return <Navigate to={"/login"} />
    }

    return <Outlet />
}
