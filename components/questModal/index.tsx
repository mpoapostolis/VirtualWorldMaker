import { useStore } from '@/store'
import { Select } from '../select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'

export function QuestModal() {
  const store = useStore()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full bg-card  border border-dashed border-card-foreground border-opacity-25 py-6 text-xs">
          Quest Editor
        </button>
      </DialogTrigger>

      <DialogContent className="lg:w-[80vw] w-screen ">
        <DialogHeader>
          <DialogTitle>Quest Editor</DialogTitle>
          <DialogDescription className="text-xs">
            Create a new quest or edit an existing one. You can add a background color or an equirectangular image.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="grid grid-cols-5 gap-4">
          <Label className=" w-full text-sm font-medium">Quest Name</Label>
          <Label className=" w-full text-sm font-medium">Required Item</Label>
          <Label className=" w-full text-sm font-medium">Quest Description</Label>
          <Label className=" w-full text-sm font-medium">Quest complete</Label>
          <Label className=" w-full text-sm font-medium">Reward</Label>
          <Input type="text" className="h-8" />
          <Select
            className="h-8"
            options={
              store?.nodes.map((node) => ({
                label: `${node.name}`,
                value: `${node.uuid}`,
              })) ?? []
            }
            onChange={console.log}
          />
          <Input className="h-8" type="text" />
          <Input className="h-8" type="text" />
          <Select
            className="h-8"
            options={
              store?.nodes.map((node) => ({
                label: `${node.name}`,
                value: `${node.uuid}`,
              })) ?? []
            }
            onChange={console.log}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
