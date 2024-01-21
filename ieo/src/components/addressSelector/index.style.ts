export default (theme: any): any => {
  return {
    modal: {
      '& .MuiDialog-paper': {
        width: '100%',
        background: '#fff',
        margin: 0,
        position: 'absolute',
        bottom: 0,
        height: 370,
        borderRadius: '10px 10px 0px 0px',
        '& .MuiDialogContent-root': {
          padding: '20px 0',
          width: '100%',
          overflow: 'hidden',
        }
      },
    },

    modalHeader: {
      fontWeight: 500,
      fontSize: 15,
      lineHeight: '22px',
      color: '#242B32',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      right: 10,
      top: -18,
    },
    modalTab: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      listStyle: 'none',
      height: 44,
      borderBottom: '0.5px solid #EDEFF2',
      margin: '20px 0 0',
      padding: 0,

    },
    tabItem: {
      width: 87,
      flex: 1,
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '15px',
      color: '#919598',
      '&.active': {
        color: '#3375E0',
      },
      '&.filled': {
        color: '#000',
      },
    },
    modalContent: {
      height: 300,
      overflowY: "auto",
      '& .list': {
        width: '100%',
        listStyle: 'none',
        padding: 0,
      },
      '& .listItem': {
        padding: 15,
        height: 44,
        width: '100%',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: '100%',
        color: '#50555B',
        '&.active': {
          color: '#3375E0',
        },
      }
    },

  }
}

