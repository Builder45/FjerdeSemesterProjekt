namespace SecureWebshop.Application.Helpers
{
    public class ValidationHelper
    {
        public static bool EmailIsValid(string email)
        {
            if (!email.Contains('@'))
                return false;

            var emailPortions = email.Split('@');
            if (emailPortions.Length != 2)
                return false;

            if (emailPortions[0].Length == 0 || emailPortions[1].Length == 0)
                return false;

            return true;
        }

        public static bool PasswordIsValid(string password)
        {
            Dictionary<string, int> charCounter = new Dictionary<string, int>()
            {
                { "lower", 0 }, { "upper", 0 }, { "digit", 0 }, { "special", 0 }
            };

            foreach (char c in password)
            {
                if (Char.IsUpper(c))
                    charCounter["upper"] = 1;
                else if (Char.IsLetter(c))
                    charCounter["lower"] = 1;
                else if (Char.IsDigit(c))
                    charCounter["digit"] = 1;
                else
                    charCounter["special"] = 1;
            }

            int passwordStrength = charCounter["upper"] + charCounter["lower"] + charCounter["digit"] + charCounter["special"];
            return passwordStrength >= 3;
        }
    }
}
