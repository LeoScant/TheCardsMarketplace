'use client';
import { Connector } from 'wagmi';
import Button from '../atoms/Button';

export function ConnectWalletButton({ready, metamaskConnector, connect, chainId}: 
    {
        ready: boolean,
        metamaskConnector: Connector, 
        connect: any,
        chainId: number
    }) {

      return (
        <Button className='mx-2 p-2 bg-blue-500 text-white rounded'
          disabled={!ready}
          onClick={() => connect({ connector: metamaskConnector, chainId })}
          label={`Connect with ${metamaskConnector.name}`}
        />
      );

}
