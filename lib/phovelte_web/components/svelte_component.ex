defmodule PhovelteWeb.SvelteComponent do
  use PhovelteWeb, :live_component

  def render(assigns) do
    ~L"""
    <span id="<%= generate_id(@name) %>" data-name="<%= @name %>" data-props="<%= json(@props) %>" phx-update="ignore" phx-hook="svelte-component"></span>
    """
  end

  defp json(props) do
    props
    |> Poison.encode
    |> case do
      {:ok, message} ->
        message
      {:error, reason} ->
        IO.inspect(reason)
        ""
    end
  end

  defp generate_id(name) do
    "svelte-#{String.replace(name, " ", "-")}-#{get_random_numbers()}"
  end

  defp get_random_numbers do
    Enum.random(0..1000000000000)
  end
end
