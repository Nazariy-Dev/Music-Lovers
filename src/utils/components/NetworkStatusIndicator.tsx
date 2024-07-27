
import { useEffect, useRef } from "react";
import { useNavigatorOnLine } from "../hooks/useNavigatorOnLine";
import { useDisplayMessage } from "../hooks/useDisplayMessage";

export const NetworkStatusIndicator = () => {
    const { show, close } = useDisplayMessage();
    const isOnline = useNavigatorOnLine();
    const firstUpdate = useRef<boolean>(true);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        isOnline
            ? show('You are back online!')
            : show('You are currently offline');
    }, [close, show, isOnline]);

    return null;
};