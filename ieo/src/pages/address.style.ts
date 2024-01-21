const styles = (theme: any) => ({
  addressContainer: {
    width: '100%',
    padding: '20px'
  },
  addressForm: {
    width: '100%',
  },

  formItem: {
    width: '100%',
    marginTop: 10,
    '&:first-child': {
      marginTop: 0,
    },
    '& .MuiInputLabel-root': {
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '20px',
      display: 'flex',
      alignItems: 'center',
      color: '#242B32',
      marginBottom: 10,
    },
    '& .MuiInputBase-root': {
      width: '100%',
      height: 50,
    },
    '& .MuiSelect-select': {
      width: '100%',
      height: 50,
      padding: '0 0 0 12px',
      display: 'flex',
      alignItems: 'center',
      background: 'none',
    },
    '& .MuiFormControl-root': {
      width: '100%',
    }
  },

  inputBox: {
    display: 'flex',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: 4,
    '&.error': {
      borderColor: '#ED3756'
    },
    '& .inputBox-selector': {
      flex: '0 1 62px',
      background: '#F5F7FA',
      width: 62,
      borderRight: '4px',
      '& .MuiInputBase-root': {
        paddingRight: '12px'

      }
    },
    '& .inputBox-input': {
      flex: 1,
      paddingLeft: 12,
    }
  },

  saveBtn: {
    margin: '20px 0',
    height: 40,
  },

  tips: {

  },

  dialog: {
    width: 315,
    padding: '20px 20px 15px',
    '& .dialogTitle': {
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '22px',
      textAlign: 'center',
      color: '#2C3242',
      marginBottom: 14,
    },
    '& .dialogContent': {
      background: '#F5F7FA',
      borderRadius: 4,
      padding: 20,
      '& p': {
        fontSize: 14,
        color: '#242B32',
        display: 'flex',
        lineHeight: '30px',
        '& span': {
          width: 60
        }
      }
    }
  },
  dialogButton: {
    height: 50,
    width: '50%',
    border: '1px solid #F5F7FA',
  }

});

export default styles