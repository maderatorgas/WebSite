from django.contrib.auth.tokens import PasswordResetTokenGenerator


class AccountActionTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            str(user.pk) + str(timestamp) + str(user.is_active)
        )

account_action_token = AccountActionTokenGenerator()
