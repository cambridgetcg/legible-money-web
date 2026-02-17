import { cn } from '@/lib/utils'

type Step = {
  title: string
  description: string | React.ReactNode
}

type StepListProps = {
  steps: Step[]
  className?: string
}

export function StepList({ steps, className }: StepListProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-[#00ff41]/30 rounded-[4px] text-[#00ff41] text-sm font-bold">
            {i + 1}
          </div>
          <div className="flex-1 pt-0.5">
            <h4 className="text-sm font-bold text-[#00ff41] mb-1">{step.title}</h4>
            <div className="text-sm text-[#e0e0e0]/80">{step.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
