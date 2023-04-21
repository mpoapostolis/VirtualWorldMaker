import clsx from 'clsx'

import { Label } from '@/components/ui/label'
import {
  Select as RSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SelectSeparator } from '@radix-ui/react-select'

export function SelectDemo() {
  return (
    <RSelect>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </RSelect>
  )
}

type Option = { label: string; value?: string }

export function Select<T = string | null>(props: {
  options: Record<string, Option[]>
  label?: string
  className?: string
  value?: string
  disabled?: string[]
  onChange: (value: T) => void
}) {
  return (
    <div className={props.className}>
      {props.label && <Label className={clsx(' w-full text-sm font-medium mb-1')}>{props.label}</Label>}

      <RSelect value={props?.value ?? '-'} onValueChange={(e) => props.onChange((e === '-' ? undefined : e) as T)}>
        <SelectTrigger>
          <SelectValue placeholder={props.value} />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(props.options).map((group) => (
            <SelectGroup key={group}>
              <SelectLabel className="pl-2  text-xs leading-5 ">{group}</SelectLabel>
              <SelectItem value="-">-</SelectItem>
              {props.options[group].map((option, idx) => (
                <SelectItem
                  disabled={props.disabled?.includes(option.value ?? '')}
                  key={`${option?.value}${idx}`}
                  value={option?.value ?? '-'}
                >
                  {option.label}
                </SelectItem>
              ))}
              {/* except last one */}
              {group !== Object.keys(props.options)[Object.keys(props.options).length - 1] && (
                <SelectSeparator className="my-1 " />
              )}
            </SelectGroup>
          ))}
        </SelectContent>
      </RSelect>
    </div>
  )
}
