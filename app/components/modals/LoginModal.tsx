'use client'

import {signIn} from 'next-auth/react'
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback,useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";

import { useRouter } from 'next/navigation';
import useAuthMenu from '@/app/hooks/useAuthMenu';


const LoginModal = () => {

    const router = useRouter();
    const loginModal = useLoginModal()
    const [isLoading,setIsLoading] = useState(false);
    const authMenuActions=useAuthMenu();

    const{
        register,
        handleSubmit,
        formState:{
            errors,
        }
    }=useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    });

    const onSumbit: SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);
//notice that this is a custom nextjs function to log in. Inside prisma we only need credentials (mail and password) to log in
        signIn('credentials',{
            ...data,
            redirect:false,
        }).then((callback)=>{
            setIsLoading(false);
//if we successfully log in
            if(callback?.ok){
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
                authMenuActions.toggleOpen();
            }

            if(callback?.error){
                toast.error(callback.error)
            }
        })
    } 

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
                title='Welcome back'
                subtitle='Log in to your account'
            />
            <Input id='email'
                label='email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input id='password'
                type='password'
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        
        <div className='flex flex-col gap-4 mt-3'>
            <hr/>
            <Button 
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={()=>signIn('google')}
            />
            <Button 
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={()=>signIn('github')}
            />
            <div
                className='text-neutral-500
                text-center
                mt-4
                font-light
                '
            >
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Already have an account?
                    </div>
                    <div className='text-neutral-800
                        cursor-pointer
                        hover:underline'
                        onClick={loginModal.onClose}>
                        Log in
                    </div>
                </div>
            </div>
        </div>
        
    )

    return (<Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSumbit)}
            body={bodyContent}
            footer={footerContent}
        />

    )
    
}

export default LoginModal;
