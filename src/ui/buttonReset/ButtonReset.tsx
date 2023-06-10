import classes from './ButtonReset.module.scss';

interface IProps {
  title: string;
  disabled: boolean;
  onClick: () => void;
}

const Button: React.FC<IProps> = ({ title, onClick, disabled }) => {
  return (
    <button onClick={onClick} className={classes.Button} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
/* Email: Yup.string().test('emailOrMobile', 'Email or Mobile number is required.', function (value) {
  const mobileNumber = this.parent.Phone;
  return !!value || !!mobileNumber;
}).matches(/^[^@]+@[^\.]+\..+$/, 'Domain name should have a dot').email('Invalid email address.'),

Phone: Yup.string().test('emailOrMobile', 'Email or Mobile number is required.', function (value) {
  const email = this.parent.Email;
  return !!value || !!email;
}).matches(/^380\d{9}$/, 'Invalid phone number format.')
), */