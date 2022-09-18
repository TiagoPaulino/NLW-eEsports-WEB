import { Check, GameController } from 'phosphor-react'
import { Input } from './Forms/input'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { useEffect, useState, FormEvent } from 'react'
import axios from 'axios'
//import * as Select from '@radix-ui/react-select'

interface Game{
    id: string,
    title: string
}

export default function CreateAdModal(){

    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [userVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

        
    useEffect(() =>{
        axios("http://localhost:3333/games")
        .then(response => {
            setGames(response.data)
        })
    }, [])

   async function handleCreateAd(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        if (!data.name){
            return;
        }

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
            name: data.name,
            yearsPlayng: Number(data.yearsPlayng),
            discord: data.discord ,
            weekDays: weekDays.map(Number),
            hourStart: data.hourStart,
            hourEnd: data.hourEnd,
            userVoiceChannel: userVoiceChannel
        })
            alert('Anuncio Criado com sucesso')
        } catch (err){
            alert("erro ao criar o anuncio")
            console.log(err)
        }
    }


    return (
        <Dialog.Portal>
            <Dialog.Overlay  className='bg-black/60 inset-0 fixed'>
                <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25' >
                    <Dialog.Title className='text-3xl font-black'>
                        Publique um anúncio
                    </Dialog.Title>

                        <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                            <select 
                                name='game'
                                id='game' 
                                className='bg-zinc-900 px-4 py-3 rounded text-sm placeholder:text-zinc-500 appearance-none '
                                defaultValue=''
                                >
                                <option disabled value=''>Selecione o game que deseja jogar</option>
                                {games.map(game=>{
                                    return <option key={game.id} value={game.id}>{game.title}</option>
                                })}
                            </select>


                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="name">Seu nome/Nickname:</label>
                            <Input type="text" name='name' id="name" placeholder='Como te chamam dentro do game'/>
                        </div>
                        <div className=' grid grid-cols-2 gap-6'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="yearsPlayng">Joga a quanto tempo?</label>
                                <Input  type="number" name='yearsPlayng'  id='yearsPlayng' placeholder='Tudo bem ser zero'/>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="discord">Qual seu Discord</label>
                                <Input type="text" name="discord" id="discord" placeholder='Usuario#0000' />
                            </div>
                        </div>
                            <div className='flex gap-6'>
                                <div>
                                    <label htmlFor="weekDays">Quando constuma jogar?</label>
                                    
                                        <ToggleGroup.Root 
                                            type='multiple' 
                                            className='grid grid-cols-5 gap-1'
                                            value={weekDays}
                                            onValueChange={setWeekDays}
                                            >
                                                <ToggleGroup.Item 
                                                value='0' 
                                                className={`w-8 h-8 rounded  ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900' } `}
                                                title='Domingo'>D</ToggleGroup.Item>
                                                <ToggleGroup.Item 
                                                value='1' 
                                                className={`w-8 h-8 rounded  ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900' } `}
                                                title='Segunda'>S</ToggleGroup.Item>
                                                <ToggleGroup.Item 
                                                value='2' 
                                                className={`w-8 h-8 rounded  ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900' } `}
                                                title='Terça'>T</ToggleGroup.Item>
                                                <ToggleGroup.Item 
                                                value='3' 
                                                className={`w-8 h-8 rounded  ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900' } `}
                                                title='Quarta'>Q</ToggleGroup.Item>
                                                <ToggleGroup.Item 
                                                value='4' 
                                                className={`w-8 h-8 rounded  ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900' } `}
                                                title='Quinta'>Q</ToggleGroup.Item>
                                                <ToggleGroup.Item 
                                                value='5' 
                                                className={`w-8 h-8 rounded  ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900' } `}
                                                title='Sexta'>S</ToggleGroup.Item>
                                                <ToggleGroup.Item 
                                                value='6' 
                                                className={`w-8 h-8 rounded  ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900' } `}
                                                title='Sabado'>S</ToggleGroup.Item>
                                        </ToggleGroup.Root>
                                    
                                </div>
                                
                            
                                <div className='flex flex-col gap-2 flex-1'>
                                    <label htmlFor="">Qual horario do dia?</label>
                                <div className='grid grid-cols-2 gap-2' >
                                    <Input type="time" name="hourStart" id="hourStart" placeholder='De'/>
                                    <Input type="time" name="hourEnd" id="hourEnd" placeholder='Até'/>
                                </div>
                            </div>
                            </div>
                            <label className='mt-2 flex gap-2 text-sm items-center'>
                                
                                <Checkbox.Root 
                                    className='w-6 h-6 p-1 rounded bg-zinc-900'
                                    checked={userVoiceChannel}
                                    onCheckedChange={(checked)=> {
                                        if (checked === true){
                                            setUseVoiceChannel(true)
                                        }else{
                                            setUseVoiceChannel(false)
                                        }
                                    } }
                                    >
                                    <Checkbox.Indicator>
                                        <Check className='w-4 h-4 text-emerald-400 ' />
                                    </Checkbox.Indicator>
                                </Checkbox.Root>

                                Costumo me conectar ao Chat de Voz
                            </label>
                            <footer className='flex mt-4 justify-end gap-4'>
                                <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                                    Cancelar
                                </Dialog.Close>
                                <button type='submit' className='bg-violet-500 flex items-center gap-3 px-5 h-12 rounded-md font-semibold hover:bg-violet-600'>
                                    <GameController size={24}/>
                                    Encontrar um Duo
                                </button>
                            </footer>
                        </form>

                    
                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog.Portal>
    )
}