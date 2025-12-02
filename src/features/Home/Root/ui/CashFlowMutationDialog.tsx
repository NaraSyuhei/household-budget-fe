import { Dialog, Button, Portal, Fieldset, Field, Input, NativeSelect } from '@chakra-ui/react'
import { type CashFlowItemView } from '../types/CashFlowItemView'
import { CashFlowTypeList } from '@/share/constants/business/cashFlowType'
import { transformCashFlowJa } from '@/share/logic/transform/transformCashFlowJa'

interface CashFlowMutationDialogProps {
  data: {
    isDialogOpen: boolean
    mutateType: 'create' | 'update' | 'delete'
    dialogOpenCashFlowId: number | null
    dialogTitle: string
    triggerButtonText: string
    submitButtonText: string
    initialData?: CashFlowItemView
  }
  handlers: {
    setIsDialogOpen: (isOpen: boolean) => void
    setDialogOpenCashFlowId: (id: number | null) => void
    onSubmit: (item: CashFlowItemView) => Promise<void>
    onChangeTargetMonth: (date: Date) => void
  }
}

export const CashFlowMutationDialog = ({ data, handlers }: CashFlowMutationDialogProps) => {
  const isOpen =
    data.isDialogOpen &&
    (data.mutateType === 'create' ? true : data.dialogOpenCashFlowId === data.initialData?.id)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const item: CashFlowItemView = {
      id: data.initialData?.id,
      amount: Number(formData.get('amount')),
      title: String(formData.get('title')),
      type: String(formData.get('type')) as (typeof CashFlowTypeList)[number],
      recordedAt: formData.get('recordedAt')
        ? new Date(formData.get('recordedAt') as string)
        : (data.initialData?.recordedAt ?? new Date()),
    }

    await handlers.onSubmit(item)
    handlers.setIsDialogOpen(false)
    handlers.setDialogOpenCashFlowId(null)
    handlers.onChangeTargetMonth(item.recordedAt)
  }

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger asChild>
        <Button
          bg={data.mutateType === 'delete' ? 'red.500' : 'teal.500'}
          onClick={() => (
            handlers.setDialogOpenCashFlowId(data.initialData?.id ?? null),
            handlers.setIsDialogOpen(true)
          )}
        >
          {data.triggerButtonText}
        </Button>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Fieldset.Root>
              <Dialog.Header>
                <Dialog.Title>
                  <Fieldset.Legend>{data.dialogTitle}</Fieldset.Legend>
                </Dialog.Title>
              </Dialog.Header>

              <form onSubmit={handleSubmit}>
                <Dialog.Body>
                  <Fieldset.Content>
                    <Field.Root required disabled={data.mutateType === 'delete'}>
                      <Field.Label>Amount</Field.Label>
                      <Input
                        name='amount'
                        type='number'
                        placeholder='Enter amount'
                        min={0}
                        defaultValue={data.initialData?.amount ?? ''}
                      />
                    </Field.Root>

                    <Field.Root required disabled={data.mutateType === 'delete'}>
                      <Field.Label>Title</Field.Label>
                      <Input
                        name='title'
                        type='text'
                        placeholder='Enter title'
                        defaultValue={data.initialData?.title ?? ''}
                      />
                    </Field.Root>

                    <Field.Root disabled={data.mutateType === 'delete'}>
                      <Field.Label>Type</Field.Label>
                      <NativeSelect.Root>
                        <NativeSelect.Field name='type' defaultValue={data.initialData?.type ?? ''}>
                          {CashFlowTypeList.map((type) => (
                            <option key={type} value={type}>
                              {transformCashFlowJa(type)}
                            </option>
                          ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    </Field.Root>

                    <Field.Root required disabled={data.mutateType === 'delete'}>
                      <Field.Label>Recorded At</Field.Label>
                      <Input
                        name='recordedAt'
                        type='date'
                        defaultValue={
                          data.initialData?.recordedAt
                            ? new Date(data.initialData.recordedAt).toISOString().slice(0, 10)
                            : new Date().toISOString().slice(0, 10)
                        }
                      />
                    </Field.Root>

                    <Field.Root hidden>
                      <Input
                        disabled
                        name='id'
                        type='text'
                        defaultValue={data.initialData?.id ?? ''}
                      />
                    </Field.Root>
                  </Fieldset.Content>
                </Dialog.Body>

                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button
                      bg={'gray.500'}
                      onClick={() => (
                        handlers.setDialogOpenCashFlowId(null),
                        handlers.setIsDialogOpen(false)
                      )}
                    >
                      Close
                    </Button>
                  </Dialog.ActionTrigger>

                  <Button type='submit' bg={data.mutateType === 'delete' ? 'red.500' : 'teal.500'}>
                    {data.submitButtonText}
                  </Button>
                </Dialog.Footer>
              </form>
            </Fieldset.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
