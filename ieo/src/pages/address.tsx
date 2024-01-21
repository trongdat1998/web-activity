import React, { useEffect, useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Controller, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { withStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogContent, DialogActions, Input, MenuItem, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import classnames from 'classnames';

import request from '../lib/request';
import withRoot from "../components/withRoot";
import { AddressSelector } from '../components';
import styles from './address.style';

/**
 * types
 */
import { Address } from '../app.interface'

const apis = {
  countries: '/s_api/basic/countries',
  saveAddress: '/api/v1/activity/lock/interest/save/address',
  getAddress: '/api/v1/activity/lock/interest/get/address',
};
// 手机号区号与语言关系
const areacode: any = {
  "zh-cn": 86,
  "en-us": 1,
  "ko-kr": 82,
  "ja-jp": 81,
  "ru-ru": 7,
  "vi-vn": 84,
  "es-es": 34,
}

const AddressPage = (props: any) => {

  const { classes, intl } = props;
  const { orderId } = props.match.params;
  const { enqueueSnackbar } = useSnackbar();

  const [initialData, setInitalData] = useState<Address>({
    orderId: "",
    contacts: "",
    nationalCode: "",
    mobile: "",
    country: "",
    address: "",
    area: "",
  });

  useEffect(() => {
    request(apis.getAddress, {
      method: 'GET',
      data: {
        orderId,
      }
    }).then((ret: any) => {
      if (ret.code === 'OK') {
        const area = ret.data.address.split(' ')[0];
        const address = ret.data.address.split(' ')[1];
        setInitalData({
          orderId: ret.data.orderId,
          contacts: ret.data.contacts,
          nationalCode: ret.data.nationalCode,
          mobile: ret.data.mobile,
          country: ret.data.domainShortName,
          address,
          area,
        });
      }
    })
  }, [orderId])

  useEffect(() => {
    if (initialData.orderId && initialData.orderId !== "0") {
      reset(initialData)
    }
  }, [initialData])

  const [countries, setCountries] = useState([]);

  const [showAreaSelector, setShowAreaSelector] = useState(true);

  const { control, handleSubmit, errors, reset } = useForm();

  const onCountryChange = (onChange: any) => (e: any) => {
    const val = e.target.value
    if (val !== 'CN') {
      setShowAreaSelector(false);
    } else {
      setShowAreaSelector(true);
    }
    onChange(val)
    return val
  }

  useEffect(() => {
    request(apis.countries, {
      method: 'GET'
    }).then((ret: any) => {
      if (ret.code === 'OK') {
        setCountries(ret.data)
      }
    })
  }, [])

  const list = useMemo(() => {
    const options: any = [];
    countries.forEach((item: any) => {
      options.push({
        label: item.nationalCode + "/" + item.countryName,
        value: item.nationalCode,
        search:
          item.countryName +
          item.nationalCode +
          item.shortName +
          item.indexName,
        id: item.id,
      });
    })
    return options;
  }, [countries])

  // 保存成功之后，显示dialog
  debugger
  const initData = {
    show: false,
    data: {
      contacts: '',
      address: '',
      mobile: '',
      domainShortName: '',
      nationalCode: ''
    }
  }
  const [showDialog, setShowDialog] = useState<any>(initData);
  const onSubmit = (data: any) => {
    setShowDialog({
      show: true,
      data: {
        contacts: data.contacts,
        mobile: `${data.nationalCode}${data.mobile}`,
        address: `${data.area || ''} ${data.address}`,
        domainShortName: data.country,
        nationalCode: data.nationalCode,
      }
    });
    return;
  }

  const onConfirm = () => {
    request(apis.saveAddress, {
      data: {
        ...showDialog.data,
        orderId,
      }
    }).then((ret: any) => {
      if (ret.code === 'OK') {
        enqueueSnackbar(intl.formatMessage({ id: "保存成功" }), { variant: "success" });
        props.history.go(-1);
      } else {
        enqueueSnackbar(intl.formatMessage({ id: "保存失败" }) + ret.msg, { variant: "error" });
        setShowDialog(initData)
      }
    })
  }

  const initialNationalCode = initialData.nationalCode || '86';
  const initialCountry = initialData.country || 'CN'

  return (
    <div className={classes.addressContainer}>
      <form className={classes.addressForm}>
        <div
          className={classes.formItem}
        >
          <InputLabel>{intl.formatMessage({ id: '联系人' })}</InputLabel>
          <Controller
            name="contacts"
            control={control}
            rules={{ required: true }}
            defaultValue={initialData.contacts}
            as={
              <OutlinedInput
                placeholder={intl.formatMessage({ id: '请输入联系人姓名' })}
                error={errors.contacts && true}
              ></OutlinedInput>}
          >
          </Controller>

        </div>
        <div
          className={classes.formItem}
        >
          <InputLabel>{intl.formatMessage({ id: '手机号' })}</InputLabel>
          <div className={classnames(classes.inputBox, {
            error: (errors.nationalCode || errors.mobile) && true
          })} >
            <Controller
              name="nationalCode"
              control={control}
              rules={{ required: true }}
              defaultValue={initialNationalCode}
              as={
                <TextField
                  className="inputBox-selector"
                  InputProps={{
                    disableUnderline: true
                  }}
                  select
                  SelectProps={{
                    renderValue: (value: any) => `${value}`
                  }}
                >
                  {list.map((item: any) => (
                    <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                  ))}
                </TextField>
              } />

            <Controller
              name="mobile"
              control={control}
              defaultValue={initialData.mobile}
              rules={{ required: true }}
              as={
                <Input
                  className="inputBox-input"
                  disableUnderline
                  placeholder={intl.formatMessage({ id: '请输入手机号' })} />
              }
            />
          </div>
        </div>
        <div
          className={classes.formItem}
        >
          <InputLabel>{intl.formatMessage({ id: '国家' })}</InputLabel>
          <Controller
            name="country"
            control={control}
            rules={{ required: true }}
            defaultValue={initialCountry}
            render={({ onChange, ref, ...inputProps }) => <TextField
              {...inputProps}
              select
              variant="outlined"
              onChange={onCountryChange(onChange)}
              inputRef={ref}
            >
              {
                countries.map((item: any) => {
                  return (
                    <MenuItem key={item.id} value={item.shortName}>
                      {item.countryName}
                    </MenuItem>
                  )
                })
              }
            </TextField>
            }
          >
          </Controller>
        </div>
        {
          showAreaSelector ?
            <div
              className={classes.formItem}
            >
              <InputLabel>{intl.formatMessage({ id: '地区' })}</InputLabel>
              <AddressSelector
                name="area"
                rules={{
                  required: true,
                }}
                defaultValue={initialData.area}
                control={control}
                error={errors.area}
                placeholder={intl.formatMessage({ id: '请选择省/市/区' })}
              ></AddressSelector>
            </div>
            : ""
        }
        <div
          className={classes.formItem}
        >
          <InputLabel>{intl.formatMessage({ id: '详细地址' })}</InputLabel>
          <Controller
            name="address"
            control={control}
            defaultValue={initialData.address}
            as={
              <OutlinedInput
                placeholder={intl.formatMessage({ id: '请输入详细地址' })}
              ></OutlinedInput>
            }
          ></Controller>
        </div>

        <Button variant="contained" color="primary"
          className={classes.saveBtn}
          fullWidth
          onClick={handleSubmit(onSubmit)}
        >
          {intl.formatMessage({ id: '保存' })}
        </Button>
        <p className={classes.tips}>
          {intl.formatMessage({ id: 'ieo.address.tips' })}
        </p>
      </form>
      <Dialog open={showDialog.show}
        maxWidth="xl"
      >
        <DialogContent className={classes.dialog}>
          <p className="dialogTitle">
            {intl.formatMessage({ id: '请确认收货地址' })}
          </p>
          <div className="dialogContent">
            <p><span>{intl.formatMessage({ id: '联系人' })}</span> {showDialog.data.contacts}</p>
            <p><span>{intl.formatMessage({ id: '手机号' })}</span> {showDialog.data.mobile}</p>
            <p><span>{intl.formatMessage({ id: '地址' })}</span> {showDialog.data.address}</p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="text" className={classes.dialogButton} onClick={() => setShowDialog(initData)}>{intl.formatMessage({ id: '取消' })}</Button>
          <Button variant="text" color="primary" className={classes.dialogButton} onClick={onConfirm}>{intl.formatMessage({ id: '确认' })}</Button>
        </DialogActions>
      </Dialog>
    </div >
  )
}

export default withRoot(withStyles(styles)(injectIntl(AddressPage)));