import RegisterNewPasskey from '@/components/register-new-passkey-button'

const Settings = () => {
    return (
        <div className="p-10 rounded-lg border border-muted mt-10 m-20">
            <div className="space-y-6">
                <div className="space-y-3">
                    <h2 className="text-xl font-medium">Registrar una passkey</h2>
                    <p className="text-sm text-secondary-foreground mt-3">
                        Registra una passkey para hacer el inicio de sesión más fácil.
                    </p>
                </div>
                <RegisterNewPasskey />
            </div>
        </div>
    )
}

export default Settings
