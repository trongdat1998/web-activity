import React, { forwardRef, useEffect, useReducer, useState } from 'react';
import { useController } from 'react-hook-form';
import { OutlinedInput, Dialog, DialogContent, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close';
import classnames from 'classnames'

import { callHandler } from "../../app_jsbridge";
import * as AreaData from './pcaa';
import styles from './index.style';

type State = {
  p: any,
  c: any,
  a: any,
}

interface AreaType {
  [propName: string]: string
}

type AreaDataType = {
  [propName: string]: AreaType
}

let pcaad: AreaDataType = AreaData;

function useGetData(p: any) {
  if (p) {
    return pcaad[p];
  }
  return {};
}

const AddressSelector = (props: any) => {

  const { classes, defaultValue, name, control, rules, error = {} } = props;

  const {
    field: { ref, ...inputProps }
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const [showModal, setShowModal] = useState(false);

  // 打开选择Modal
  const openSelectorModal = () => {
    setActiveTab(0);
    setShowModal(true)
  }

  const cancel = () => {
    setShowModal(false)
  }

  const initValue = {
    p: { key: '', value: '', label: '省份' },
    c: { key: '', value: '', label: '城市' },
    a: { key: '', value: '', label: '地区' },
  }
  function reducer(state: State, action: any): State {
    switch (action.type) {
      case 'p':
        return {
          ...initValue,
          p: action.payload,
        }
      case 'c':
        return {
          p: state.p,
          c: action.payload,
          a: initValue.a,
        }
      case 'a':
        return {
          ...state,
          a: action.payload,
        }
      default:
        return state;
    }
  }
  const [selectedArea, dispatch] = useReducer(reducer, initValue)

  // 激活的tab
  const [activeTab, setActiveTab] = useState(0);

  const proviences: AreaType = pcaad['86'];
  const cities: AreaType = useGetData(selectedArea.p.key);
  const areas: AreaType = useGetData(selectedArea.c.key);

  const onActiveTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  }

  // 选择省份
  const onSelectProvience = (key: string) => {
    dispatch({
      type: 'p',
      payload: { key, value: proviences[key] }
    })
    setActiveTab(1)
  }

  // 选择城市
  const onSelectCity = (key: string) => {
    dispatch({
      type: 'c',
      payload: { key, value: cities[key] }
    })
    setActiveTab(2)
  }


  // 选择地区
  const onSelectArea = (key: string) => {
    dispatch({
      type: 'a',
      payload: { key, value: areas[key] }
    })
    setShowModal(false);
  }

  const renderAreaList = (tab: number) => {
    switch (tab) {
      case 0:
        return (
          <ul className="list">
            {
              Object.keys(proviences).map((key: string) => (
                <li className={classnames({
                  listItem: true,
                  active: selectedArea.p.key === key
                })} key={key} onClick={() => onSelectProvience(key)}>{proviences[key]}</li>
              ))
            }
          </ul>
        )
      case 1:
        return (<ul className="list">
          {
            Object.keys(cities).map((key: string) => (
              <li className={classnames({
                listItem: true,
                active: selectedArea.c.key === key
              })} key={key} onClick={() => onSelectCity(key)}>{cities[key]}</li>
            ))
          }
        </ul>
        )
      case 2:
        return (<ul className="list">
          {
            Object.keys(areas).map((key: string) => (
              <li className={classnames({
                listItem: true,
                active: selectedArea.a.key === key
              })} key={key} onClick={() => onSelectArea(key)}>{areas[key]}</li>
            ))
          }
        </ul>
        )
      default:
        return ""
    }
  }

  const [value, setValue] = useState('');
  useEffect(() => {
    setValue(defaultValue);

  }, [defaultValue])

  useEffect(() => {
    if (selectedArea.p.value && selectedArea.c.value && selectedArea.a.value) {
      const newVal = `${selectedArea.p.value}/${selectedArea.c.value}/${selectedArea.a.value}`;
      setValue(newVal);
      inputProps.onChange && inputProps.onChange(newVal);
      props.onChange && props.onChange(newVal);
    }
  }, [selectedArea.p, selectedArea.c, selectedArea.a])

  useEffect(() => {
    if (window.localStorage.platform === "bhexApp") {
      callHandler({
        name: "refreshControl",
        data: {
          disableRefresh: showModal,
        },
      });
    }
  }, [showModal]);

  return (
    <div>
      <OutlinedInput type="text"
        {...inputProps}
        error={error.type && true}
        onClick={openSelectorModal}
        value={value}
        inputRef={ref}
        placeholder={props.placeholder}
        readOnly
      />
      <Dialog
        fullWidth
        maxWidth="xl"
        open={showModal} className={classes.modal}>
        <DialogContent>
          <div className={classes.modalHeader}>
            <div>请选择地区</div>
            <IconButton aria-label="close" className={classes.closeButton} onClick={cancel}>
              <CloseIcon fontSize="large" />
            </IconButton>
            <ul className={classes.modalTab}
            >
              <li className={
                classnames(classes.tabItem, {
                  active: activeTab == 0,
                  filled: selectedArea.p.key
                })
              }
                onClick={() => onActiveTabChange(0)}
              >{selectedArea.p.value || selectedArea.p.label}</li>
              <li className={classnames(classes.tabItem, {
                active: activeTab == 1,
                filled: selectedArea.c.key
              })}
                onClick={() => onActiveTabChange(1)}
              >{selectedArea.c.value || selectedArea.c.label}</li>
              <li className={classnames(classes.tabItem, {
                active: activeTab == 2,
                filled: selectedArea.a.key

              })}
                onClick={() => onActiveTabChange(2)}
              >{selectedArea.a.value || selectedArea.a.label}</li>
            </ul>
          </div>
          <div className={classes.modalContent}>
            {renderAreaList(activeTab)}
          </div>
        </DialogContent>
      </Dialog>
    </div >
  )
}

export default withStyles(styles)(AddressSelector)