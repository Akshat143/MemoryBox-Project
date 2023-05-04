// import { makeStyles } from '@material-ui/core/styles';

// export default makeStyles((theme) => ({
//     footer: {
//         margin: '30px 0',
//         display: 'flex',
//         flexDirection: 'row',
//         padding: '10px 50px',
//         backgroundColor: '#ECEFF1',
//         // color: 'white',
//         alignItems: 'center',
//         [theme.breakpoints.down('sm')]: {
//             flexDirection: 'column',
//           },
//     }
      
// }));

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  footer: {
    margin: '30px 0',
    backgroundColor: '#ECEFF1',
    // color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      '& div': {
        margin: theme.spacing(1),
      },
    },
  },
  leftFooter: {
    flexGrow: 1,
  },
  midFooter: {
    flexGrow: 2,
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
  rightFooter: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      order: 2,
      justifyContent: 'center',
    },
    '& a': {
      color: 'white',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
  },
}));
