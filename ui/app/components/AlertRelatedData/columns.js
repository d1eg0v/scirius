import constants from 'ui/constants';
import moment from 'moment';
const { DATE_TIME_FORMAT } = constants;

const showMitreInfo = (mtn, mti) => {
  if (mtn && mti) {
    return `${mtn} ${mti}`;
  }
  if (mtn) {
    return mtn;
  }
  if (mti) {
    return mti;
  }
  return 'n/a';
};

const columns = {
  Alert: [
    { title: 'Timestamp', dataIndex: '@timestamp', render: val => moment(val).format(DATE_TIME_FORMAT) },
    { title: 'Signature', dataIndex: ['alert', 'signature'] },
    { title: 'SignatureID', dataIndex: ['alert', 'signature_id'] },
    { title: 'Category', dataIndex: ['alert', 'category'] },
    {
      title: 'Mitre Tactic',
      render: val => {
        const { mitre_tactic_name: mtn, mitre_tactic_id: mti } = val.alert?.metadata || {};
        return showMitreInfo(mtn, mti);
      },
    },
    {
      title: 'Mitre Technique',
      render: val => {
        const { mitre_technique_name: mtn, mitre_technique_id: mti } = val.alert?.metadata || {};
        return showMitreInfo(mtn, mti);
      },
    },
  ],
  Http: [
    { title: 'Timestamp', dataIndex: '@timestamp', render: val => moment(val).format(DATE_TIME_FORMAT) },
    { title: 'Host', dataIndex: ['http', 'hostname'] },
    { title: 'URL', dataIndex: ['http', 'url'] },
    { title: 'User Agent', dataIndex: ['http', 'http_user_agent'] },
    { title: 'Status', dataIndex: ['http', 'status'] },
  ],
  Tls: [
    { title: 'Timestamp', dataIndex: '@timestamp', render: val => moment(val).format(DATE_TIME_FORMAT) },
    { title: 'SNI', dataIndex: ['tls', 'sni'] },
    { title: 'Subject', dataIndex: ['tls', 'subject'] },
    { title: 'Issuer', dataIndex: ['tls', 'issuerdn'] },
  ],
  Flow: [
    { title: 'Start time', dataIndex: ['flow', 'start'], render: val => moment(val).format(DATE_TIME_FORMAT) },
    { title: 'End time', dataIndex: ['flow', 'end'], render: val => moment(val).format(DATE_TIME_FORMAT) },
    {
      title: 'Duration',
      render: val => {
        if (val.flow && val.flow.end && val.flow.start) {
          return moment.duration(moment(val.flow.end).unix() - moment(val.flow.start).unix(), 'seconds').humanize();
        }
        return 'n/a';
      },
    },
    { title: 'Bytes to server', dataIndex: ['flow', 'bytes_toserver'] },
    { title: 'Bytes to client ', dataIndex: ['flow', 'bytes_toclient'] },
    { title: 'Pkt to server', dataIndex: ['flow', 'pkts_toserver'] },
    { title: 'Pkt to client', dataIndex: ['flow', 'pkts_toclient'] },
  ],
  Smb: [
    { title: 'Timestamp', dataIndex: '@timestamp', render: val => moment(val).format(DATE_TIME_FORMAT) },
    { title: 'Command', dataIndex: ['smb', 'command'] },
    { title: 'Severity', dataIndex: ['smb', 'ext_status', 'severity'] },
    { title: 'Interface', dataIndex: ['smb', 'dcerpc', 'interface'] },
    { title: 'Endpoint', dataIndex: ['smb', 'dcerpc', 'endpoint'] },
  ],
};

export default columns;