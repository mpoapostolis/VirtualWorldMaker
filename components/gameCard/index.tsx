import { Game } from '@/lib/games/types'
import { HeartIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

export function GameCard(props: Game) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-full  h-fit  shadow-lg    relative">
            <div className="h-52  bg-black p-2 relative ">
              <Button className=" text-xs  bg-transparent w-fit  absolute top-0 right-0 "></Button>
              <picture>
                <img loading="lazy" src={props.preview} className="w-full object-scale-down  h-full " alt="" />
              </picture>
            </div>
            <div className="p-2 pb-4 h-fit bg-card flex flex-col">
              <div className="flex gap-4 items-center justify-end">
                <h3 className="text-lg capitalize text-secondary font-bold flex">{props?.name ?? '-'}</h3>
                <Button aria-label="favorite" className="w-fit ml-auto " size="sm" variant="ghost">
                  <HeartIcon className="w-4 h-4" />
                  <span className="text-xs font-thin ml-2">0 Likes</span>
                </Button>
              </div>
              <span className="text-xs font-thin">{props?.createdBy?.split('@')[0] ?? '-'}</span>
              <p className="text-xs text-foreground  my-3 line-clamp-1">{props?.description ?? '-'}</p>
              <div className="flex mt-3">
                <Button className="w-fit rounded-full border " variant="default">
                  <Link href={`/?genre=${props.id}`}>{props.genre}</Link>
                </Button>

                <Link className="flex w-full" href={`/game?id=${props.id}`}>
                  <Button className="w-fit rounded-full  ml-auto" variant="secondary">
                    Play
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-72 text-base text-foreground ">
          <h3 className="text-lg capitalize text-secondary font-bold flex text-justifys">{props?.name ?? '-'}</h3>
          <Separator className="my-2" />
          <p className="flex text-justify">{props?.description ?? '-'}</p>
          <br />
          <div className="grid grid-cols-2">
            <span className="font-thin">Genre:</span>
            <span className="font-semibold">{props?.genre ?? '-'}</span>
            <span className="font-thin">Created By:</span>
            <span className="font-semibold">{props?.createdBy?.split('@')[0] ?? '-'}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
