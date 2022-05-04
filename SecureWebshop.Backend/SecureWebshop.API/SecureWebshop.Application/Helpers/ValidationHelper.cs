namespace SecureWebshop.Application.Helpers
{
    public class ValidationHelper
    {
        public static bool EmailIsValid(string email) => email.Contains('@');

        public static bool PasswordIsValid(string password)
        {
            if (password.Length < 8)
                return false;

            Dictionary<string, int> charCounter = new Dictionary<string, int>()
            {
                { "lower", 0 },
                { "upper", 0 },
                { "digit", 0 },
                { "special", 0 }
            };

            foreach (char c in password)
            {
                if (Char.IsUpper(c))
                    charCounter["upper"]++;
                else if (Char.IsLetter(c))
                    charCounter["lower"]++;
                else if (Char.IsDigit(c))
                    charCounter["digit"]++;
                else
                    charCounter["special"]++;
            }

            Console.WriteLine(charCounter);

            int passwordStrength = 0;

            if (charCounter["upper"] > 0)
                passwordStrength++;
            if (charCounter["lower"] > 0)
                passwordStrength++;
            if (charCounter["digit"] > 0)
                passwordStrength++;
            if (charCounter["special"] > 0)
                passwordStrength++;

            return passwordStrength >= 3;
        }
    }
}
