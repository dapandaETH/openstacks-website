import { useState } from 'react'
import './GenApiKey.css'

export default function GenApiKey() {
  const [keys, setKeys] = useState([])
  const [newKeyName, setNewKeyName] = useState('')
  const [generatedKey, setGeneratedKey] = useState(null)

  const generateKey = () => {
    if (!newKeyName.trim()) return
    const key = 'sk-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setKeys([...keys, { name: newKeyName, key, created: new Date().toISOString() }])
    setGeneratedKey(key)
    setNewKeyName('')
  }

  const copyKey = (key) => {
    navigator.clipboard.writeText(key)
  }

  return (
    <div className="api-keys-page">
      <h1>API Keys</h1>
      <p className="api-keys-description">Generate and manage your API keys for accessing OpenStacks.</p>

      <div className="api-keys-generator">
        <input
          type="text"
          placeholder="Key name (e.g., Production)"
          value={newKeyName}
          onChange={(e) => setNewKeyName(e.target.value)}
          className="api-keys-input"
        />
        <button onClick={generateKey} className="api-keys-btn">
          Generate Key
        </button>
      </div>

      {generatedKey && (
        <div className="api-keys-generated">
          <p>Your new API key (copy it now, it won't be shown again):</p>
          <code>{generatedKey}</code>
          <button onClick={() => copyKey(generatedKey)} className="api-keys-copy-btn">
            Copy
          </button>
        </div>
      )}

      <div className="api-keys-list">
        <h2>Your Keys</h2>
        {keys.length === 0 ? (
          <p className="api-keys-empty">No API keys yet. Generate one above.</p>
        ) : (
          <table className="api-keys-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Key</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((key, i) => (
                <tr key={i}>
                  <td>{key.name}</td>
                  <td><code>{key.key.substring(0, 8)}...{key.key.substring(key.key.length - 4)}</code></td>
                  <td>{new Date(key.created).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => copyKey(key.key)} className="api-keys-copy-btn">
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
