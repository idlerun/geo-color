import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormHelperText
} from '@mui/material'
import React from 'react'

function isValidCsv(txt: string): boolean {
  const lines = txt.split('\n')
  for (const line of lines) {
    const sp = line.split(',')
    if (sp.length != 3) {
      return false
    }
    for (const s of sp) {
      if (!/^-?\d+(?:[.,]\d*?)?$/.test(s)) {
        return false
      }
    }
    const v = sp.map(parseFloat)
    if (v[0] < -90 || v[0] > 90 || v[1] < -180 || v[1] > 180) {
      return false
    }
  }
  return true
}

export function CsvInputView(props: {
  open: boolean
  defaultCsv: string
  setCsv: (csv: string) => void
  onClose: () => void
}) {
  const [editCsv, setEditCsv] = React.useState(props.defaultCsv)
  const [errorMsg, setErrorMsg] = React.useState<string>()

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const txt = event.currentTarget.value
    const isValid = isValidCsv(txt)
    setErrorMsg(isValid ? undefined : 'Invalid format')
    setEditCsv(txt)
  }
  return (
    <Dialog fullWidth open={props.open} onClose={props.onClose}>
      <DialogTitle>CSV Data</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter CSV data in format: latitude, longitude, value
        </DialogContentText>
        <FormHelperText error={!!errorMsg}>{errorMsg}</FormHelperText>
        <TextField
          multiline
          inputProps={{ style: { fontFamily: 'Roboto', fontSize: '80%' } }}
          minRows={200}
          autoFocus
          margin="dense"
          id="csv"
          label="CSV"
          fullWidth
          value={editCsv}
          onChange={onChange}
          error={!!errorMsg}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button
          disabled={!!errorMsg}
          onClick={() => {
            props.setCsv(editCsv)
            props.onClose()
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
