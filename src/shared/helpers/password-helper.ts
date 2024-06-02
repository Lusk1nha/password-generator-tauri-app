import { PasswordStrength } from "../enums/password-enum";

/**
 * Function to generate a password based on the form values
 * @param password
 * @returns
 */
export function generateStrengthRate(password: string): {
  level: PasswordStrength;
  score: number;
} {
  let score = 0;

  // Critérios de pontuação
  const length = password.length;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Adicionando pontos com base no comprimento da senha
  if (length >= 1 && length <= 20) {
    score += length;
  }

  // Adicionando pontos para cada tipo de caractere incluído
  if (hasUppercase) score += 1;
  if (hasLowercase) score += 1;
  if (hasNumbers) score += 2;
  if (hasSymbols) score += 3;

  // Determinando o nível de segurança com base na pontuação
  let level;

  if (score < 5) {
    level = PasswordStrength.TooWeak;
  } else if (score < 10) {
    level = PasswordStrength.Weak;
  } else if (score <= 15) {
    level = PasswordStrength.Medium;
  } else {
    level = PasswordStrength.Strong;
  }

  return { level, score };
}

export function generateTextBasedOnRate(rate: PasswordStrength) {
  switch (rate) {
    case PasswordStrength.TooWeak:
      return "too weak";
    case PasswordStrength.Weak:
      return "weak";
    case PasswordStrength.Medium:
      return "medium";
    case PasswordStrength.Strong:
      return "strong";
    default:
      return "";
  }
}

export function generateTailwindBasedOnRate(rate: PasswordStrength) {
  switch (rate) {
    case PasswordStrength.TooWeak:
      return "bg-strength-too_weak";
    case PasswordStrength.Weak:
      return "bg-strength-weak";
    case PasswordStrength.Medium:
      return "bg-strength-medium";
    case PasswordStrength.Strong:
      return "bg-strength-strong";
    default:
      return "";
  }
}
