"use client"
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { LogoutApi } from '../Api';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { AppContext } from '../context/AppNotify';

export default function LogoutComp () {
    const { showToast } = AppContext();
    const queryClient = useQueryClient();
// const naviagte=useNavigate();
const router=useRouter();
     const muatteion = useMutation({ mutationFn:LogoutApi ,
  onSuccess: async () => {
    showToast({ type: "SUCCESS", message: "Logout Successfully!" });
    await queryClient.invalidateQueries({ queryKey: ["validateToken"] })
    router.push("/");
  },});
    const submition = () => {
        muatteion.mutate()
    }
    return (
        <Button className="flex w-full justify-center items-center bg-red-500 hover:bg-red-300 flex-1 hover:cursor-pointer text-white font-bold p-1 rounded" onClick={submition}>Logout</Button>
    )
}
