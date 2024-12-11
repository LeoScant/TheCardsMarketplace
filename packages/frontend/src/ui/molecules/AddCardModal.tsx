import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Input from '../atoms/Input'
import { ICard } from '@/src/interfaces/card.interface'
import Modal from '../atoms/Modal'

export default function AddCardModal({ isOpen, closeModal, card, setCard, onConfirm }: { isOpen: boolean, closeModal: any, card: ICard, setCard: any, onConfirm: any }) {
  const [isLoading, setIsLoading] = useState(false)
  const setTitle = (title: string) => {
    setCard({ ...card, title })
  }

  const setDescription = (description: string) => {
    setCard({ ...card, description })
  }

  const setImageUrl = (imageurl: string) => {
    setCard({ ...card, imageurl })
  }

  const onClickConfirm = async () => {
    setIsLoading(true)
    await onConfirm()
    setIsLoading(false)
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} title='Add Card' onConfirm={onClickConfirm} disableConfirm={isLoading}>
      {isLoading ?
        <p className="text-black">Minting</p> :
        <>
          <Input label='Title' name='Title' placeholder='Card name...' value={card.title} setValue={setTitle} />
          <Input label='Description' name='Description' placeholder='Card description...' value={card.description} setValue={setDescription} />
          <Input label='Url' name='Url' placeholder='Card image url..' value={card.imageurl} setValue={setImageUrl} />
        </>}
    </Modal>
  )
}
