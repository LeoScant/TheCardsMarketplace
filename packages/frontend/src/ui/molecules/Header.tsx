'use client';
import React from 'react';
import Image from 'next/image';
import { Connector, useChainId, useConnect } from 'wagmi';
import { useState, useEffect } from 'react';
import { config } from '../../config/wagmi';
import { useAccount } from 'wagmi';
import { handleLogin, handleLogout } from '../../services/users.api'
import { disconnect } from 'wagmi/actions';
import { signMessage } from '@wagmi/core'
import useStore from '../../store/store';
import Button from '../atoms/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
    const chainId = useChainId({ config });
    const { connectors, connect } = useConnect();
    const metamaskConnector: Connector = connectors[0];
    const [ready, setReady] = useState(false);
    const { isConnected, address, } = useAccount();
    const isLoggedIn = useStore((state: any) => state.isLoggedIn)
    const pathname = usePathname();

    useEffect(() => {
        (async () => {
            const provider = await metamaskConnector.getProvider();
            setReady(!!provider);
        })();
    }, [metamaskConnector, setReady]);

    const login = async () => {
        connect({ connector: metamaskConnector, chainId })
        if (isConnected && address)
            await handleLogin(address?.toString(), signMessage)
    }

    const logout = async () => {
        await disconnect(config)
        await handleLogout()
    }

    return (
        <header className='flex flex-wrap items-center justify-between p-4'>
            <div className='flex items-center'>
                <Image
                    src='/cards-marketplace-logo.png'
                    width={100}
                    height={100}
                    alt='Cards Marketplace Logo'
                />
                <h1 className='text-2xl pl-5 font-bold'>The Cards Emporium</h1>
            </div>
            <div>
                <Link key='Home' href='/'>
                    <Button label='Home' active={pathname === '/'} />
                </Link>
                {!isLoggedIn ?
                    <Button
                        disabled={!ready}
                        onClick={login}
                        label={`Connect with ${metamaskConnector.name}`}
                    /> :
                    <>
                        <Link key='User' href='/user'>
                            <Button label='Profile' active={pathname === '/user'} />
                        </Link>
                        <Button
                            onClick={logout}
                            label={`Logout`}
                        />
                    </>

                }
            </div>

        </header>
    );
};

export default Header;
